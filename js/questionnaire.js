document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            key: 'pace',
            question: "What's your ideal travel pace?",
            options: [
                { text: "Energetic & Adventurous", value: 'energetic', icon: '⚡️' },
                { text: "Calm & Relaxing", value: 'calm', icon: '🧘' }
            ]
        },
        {
            key: 'focus',
            question: "What's your primary interest?",
            options: [
                { text: "History & Culture", value: 'history', icon: '🏛️' },
                { text: "Food & Gastronomy", value: 'food', icon: '🍲' }
            ]
        },
        {
            key: 'style',
            question: "How do you like to explore?",
            options: [
                { text: "Iconic & Popular Spots", value: 'popular', icon: '🌟' },
                { text: "Hidden Local Gems", value: 'hidden', icon: '💎' }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    const userAnswers = {};

    const questionCard = document.getElementById('question-card');
    const progressBar = document.getElementById('progress-bar');

    function displayQuestion() {
        const questionData = questions[currentQuestionIndex];
        
        // Kartı temizle ve içeriği oluştur
        questionCard.innerHTML = `
            <h2>${questionData.question}</h2>
            <div class="options-container">
                ${questionData.options.map(opt => `
                    <div class="option-card" data-value="${opt.value}" data-key="${questionData.key}">
                        <div class="icon">${opt.icon}</div>
                        <h3>${opt.text}</h3>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Seçeneklere tıklama olayını ekle
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', handleOptionSelect);
        });
    }

    function handleOptionSelect(e) {
        const selectedCard = e.currentTarget;
        userAnswers[selectedCard.dataset.key] = selectedCard.dataset.value;
        
        currentQuestionIndex++;
        updateProgressBar();
        
        questionCard.classList.add('fade-out'); // Kartı soluklaştır

        setTimeout(() => {
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
                questionCard.classList.remove('fade-out'); // Yeni kartı göster
            } else {
                redirectToBuilder();
            }
        }, 400); // Animasyon süresiyle eşleşmeli
    }

    function updateProgressBar() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function redirectToBuilder() {
        // Cevapları URL parametresine çevir
        const queryParams = new URLSearchParams(userAnswers).toString();
        window.location.href = `journey-builder.html?${queryParams}`;
    }

    // İlk soruyu göstererek başla
    displayQuestion();
});