document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            key: 'pace',
            question: "What's your ideal travel pace?",
            type: 'single', // Tek seçim
            options: [
                { text: "Energetic & Adventurous", value: 'energetic', icon: '⚡️' },
                { text: "Calm & Relaxing", value: 'calm', icon: '🧘' }
            ]
        },
        {
            key: 'focus',
            question: "What's your primary interest?",
            type: 'single',
            options: [
                { text: "History & Culture", value: 'history', icon: '🏛️' },
                { text: "Food & Gastronomy", value: 'food', icon: '🍲' },
                { text: "Nature & Wellness", value: 'nature', icon: '🌳' }
            ]
        },
        {
            key: 'preferences',
            question: "Any special preferences we should consider?",
            type: 'multiple', // Çoklu seçim
            options: [
                { text: "Vegan-Friendly Options", value: 'vegan', icon: '🌱' },
                { text: "LGBT+ Friendly Spaces", value: 'lgbt-friendly', icon: '🏳️‍🌈' }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    const userAnswers = {};

    const questionCard = document.getElementById('question-card');
    const progressBar = document.getElementById('progress-bar');

    function displayQuestion() {
        const questionData = questions[currentQuestionIndex];
        
        let optionsHtml = questionData.options.map(opt => `
            <div class="option-card" data-value="${opt.value}">
                <div class="icon">${opt.icon}</div>
                <h3>${opt.text}</h3>
            </div>
        `).join('');

        let actionButton = '';
        if (questionData.type === 'multiple') {
            optionsHtml += `<button id="next-button" class="cta-button">Continue</button>`;
        }

        questionCard.innerHTML = `
            <h2>${questionData.question}</h2>
            <div class="options-container ${questionData.type === 'multiple' ? 'multiple-choice' : ''}">
                ${optionsHtml}
            </div>
        `;
        
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', (e) => handleOptionSelect(e, questionData));
        });

        if (questionData.type === 'multiple') {
            document.getElementById('next-button').addEventListener('click', goToNextQuestion);
        }
    }

    function handleOptionSelect(e, questionData) {
        const selectedCard = e.currentTarget;
        const value = selectedCard.dataset.value;

        if (questionData.type === 'single') {
            userAnswers[questionData.key] = value;
            goToNextQuestion();
        } else { // Multiple choice
            selectedCard.classList.toggle('selected');
            const key = questionData.key;
            if (!userAnswers[key]) userAnswers[key] = [];

            if (selectedCard.classList.contains('selected')) {
                userAnswers[key].push(value);
            } else {
                userAnswers[key] = userAnswers[key].filter(v => v !== value);
            }
        }
    }

    function goToNextQuestion() {
        currentQuestionIndex++;
        updateProgressBar();
        
        questionCard.classList.add('fade-out');

        setTimeout(() => {
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
                questionCard.classList.remove('fade-out');
            } else {
                redirectToBuilder();
            }
        }, 400);
    }

    function updateProgressBar() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function redirectToBuilder() {
        const queryParams = new URLSearchParams();
        for (const key in userAnswers) {
            const value = userAnswers[key];
            if (Array.isArray(value)) {
                value.forEach(v => queryParams.append(key, v));
            } else {
                queryParams.set(key, value);
            }
        }
        window.location.href = `journey-builder.html?${queryParams.toString()}`;
    }

    displayQuestion();
});