document.addEventListener('DOMContentLoaded', async () => {

    // --- AŞAMA 1: VERİLERİ HARİCİ JSON DOSYASINDAN ÇEKME ---
    let activityPool = [];
    try {
        const response = await fetch('activities.json');
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        activityPool = await response.json();
    } catch (error) {
        console.error('Failed to load activities.json:', error);
        // Hata durumunda kullanıcıya bilgi verelim
        const poolContainer = document.getElementById('activity-pool');
        if(poolContainer) poolContainer.innerHTML = '<p style="color: red;">Could not load activities. Please check the console for errors and ensure activities.json exists.</p>';
        return; // Hata varsa script'in devamını çalıştırma
    }

    let currentItinerary = [];
    let draggedItem = null; // Sürüklenen öğeyi takip etmek için

    // --- AŞAMA 2: DOM ELEMENTLERİNİ SEÇME ---
    const itineraryList = document.getElementById('itinerary-list');
    const activityPoolContainer = document.getElementById('activity-pool');
    const totalDurationEl = document.getElementById('total-duration');
    const totalPriceEl = document.getElementById('total-price');

    // --- AŞAMA 3: ANKETE GÖRE KİŞİSELLEŞTİRİLMİŞ ROTA OLUŞTURMA ---
    function generateInitialItinerary(choices) {
        let scoredActivities = activityPool.map(activity => {
            let score = 0;
            const props = activity.properties;

            // Puanlama Mantığı
            if (props.pace === choices.get('pace')) score += 2;
            if (props.focus.includes(choices.get('focus'))) score += 3; // Odak noktası daha önemli
            
            // Çoklu seçilebilen özel tercihleri kontrol et
            const preferences = choices.getAll('preferences'); // ['vegan', 'lgbt-friendly'] gibi bir dizi döner
            preferences.forEach(pref => {
                if ((props.dietary && props.dietary.includes(pref)) || 
                    (props.inclusivity && props.inclusivity.includes(pref))) {
                    score += 5; // Özel tercihler en yüksek puanı alır
                }
            });

            return { ...activity, score };
        });

        // En yüksek puanlıları en üste alacak şekilde sırala
        scoredActivities.sort((a, b) => b.score - a.score);
        
        // En yüksek puanlı ilk 3 etkinliği rotaya ekle
        return scoredActivities.slice(0, 3);
    }

    const userChoices = new URLSearchParams(window.location.search);
    if (userChoices.has('pace') && activityPool.length > 0) {
        // Eğer anketten gelen cevaplar varsa, kişiselleştirilmiş rotayı oluştur
        currentItinerary = generateInitialItinerary(userChoices);
    } else if (activityPool.length > 0) {
        // Cevap yoksa, standart bir varsayılan rota ata
        currentItinerary = activityPool.length > 2 ? [activityPool[0], activityPool[1], activityPool[2]] : [];
    }
    
    // --- AŞAMA 4: EKRANI GÜNCELLEYEN ANA FONKSİYONLAR ---

    function renderItinerary() {
        itineraryList.innerHTML = '';
        currentItinerary.forEach((step, index) => {
            const stepElement = document.createElement('li');
            stepElement.className = 'itinerary-step';
            stepElement.dataset.index = index;
            stepElement.setAttribute('draggable', 'true');
            stepElement.innerHTML = `
                <h4>${index + 1}. ${step.name}</h4>
                <p>${step.description}</p>
                <p><strong>Duration:</strong> ${step.duration} hours | <strong>Price:</strong> $${step.price}</p>
            `;
            itineraryList.appendChild(stepElement);
        });
        addItineraryDragListeners();
        updateSummary();
    }

    function renderActivityPool() {
        activityPoolContainer.innerHTML = '';
        activityPool.forEach(activity => {
            const poolItem = document.createElement('div');
            poolItem.className = 'pool-item';
            poolItem.dataset.id = activity.id;
            poolItem.setAttribute('draggable', 'true');
            poolItem.innerHTML = `
                <h4>${activity.name}</h4>
                <p>+${activity.duration}h | +$${activity.price}</p>
            `;
            activityPoolContainer.appendChild(poolItem);
        });
        addPoolDragListeners();
    }

    function updateSummary() {
        const totalDuration = currentItinerary.reduce((sum, step) => sum + step.duration, 0);
        const totalPrice = currentItinerary.reduce((sum, step) => sum + step.price, 0);
        totalDurationEl.textContent = totalDuration;
        totalPriceEl.textContent = totalPrice;
    }

    // --- AŞAMA 5: SÜRÜKLE-BIRAK ETKİLEŞİMLERİ ---

    function addPoolDragListeners() {
        const poolItems = document.querySelectorAll('.pool-item');
        poolItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                draggedItem = e.target;
                e.dataTransfer.setData('text/plain', `pool-${item.dataset.id}`);
                setTimeout(() => item.classList.add('dragging'), 0);
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });
        });
    }

    function addItineraryDragListeners() {
        const itinerarySteps = document.querySelectorAll('.itinerary-step');
        itinerarySteps.forEach(step => {
            step.addEventListener('dragstart', (e) => {
                draggedItem = e.target;
                e.dataTransfer.setData('text/plain', `itinerary-${step.dataset.index}`);
                setTimeout(() => step.classList.add('dragging'), 0);
            });

            step.addEventListener('dragend', () => {
                step.classList.remove('dragging');
            });

            step.addEventListener('dragover', (e) => {
                e.preventDefault();
                step.classList.add('drag-over');
            });

            step.addEventListener('dragleave', () => {
                step.classList.remove('drag-over');
            });

            step.addEventListener('drop', (e) => {
                e.preventDefault();
                step.classList.remove('drag-over');
                
                const data = e.dataTransfer.getData('text/plain');
                const [type, idOrIndex] = data.split('-');
                
                const targetIndex = parseInt(step.dataset.index);

                if (type === 'pool') {
                    const activityId = parseInt(idOrIndex);
                    const newActivity = activityPool.find(act => act.id === activityId);
                    if (newActivity) {
                        currentItinerary[targetIndex] = newActivity;
                    }
                } 
                else if (type === 'itinerary') {
                    const draggedIndex = parseInt(idOrIndex);
                    const [removedItem] = currentItinerary.splice(draggedIndex, 1);
                    currentItinerary.splice(targetIndex, 0, removedItem);
                }
                renderItinerary();
            });
        });
    }

    // --- AŞAMA 6: SAYFANIN İLK YÜKLENMESİ ---
    renderItinerary();
    renderActivityPool();
});