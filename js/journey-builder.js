document.addEventListener('DOMContentLoaded', () => {

    // --- VERİLER ---
    const activityPool = [
        { id: 101, name: "Grand Bazaar Spice Hunt", description: "Discover hidden spices and Turkish delight.", duration: 3, price: 50 },
        { id: 102, name: "Bosphorus Ferry Ride", description: "A relaxing cruise between two continents.", duration: 2, price: 25 },
        { id: 103, name: "Hagia Sophia History Tour", description: "Explore the depths of a world wonder.", duration: 2.5, price: 40 },
        { id: 104, name: "Turkish Coffee Workshop", description: "Learn to make and read fortunes in coffee.", duration: 2, price: 60 },
        { id: 105, name: "Galata Tower Sunset View", description: "See Istanbul's magical sunset from the top.", duration: 1.5, price: 20 },
        { id: 106, name: "Street Art in Kadıköy", description: "Explore the vibrant murals of the Asian side.", duration: 3, price: 30 }
    ];

    let currentItinerary = [ activityPool[2], activityPool[0], activityPool[4] ];

    // --- DOM ELEMENTLERİ ---
    const itineraryList = document.getElementById('itinerary-list');
    const activityPoolContainer = document.getElementById('activity-pool');
    const totalDurationEl = document.getElementById('total-duration');
    const totalPriceEl = document.getElementById('total-price');

    // --- SÜRÜKLE-BIRAK DEĞİŞKENLERİ ---
    let draggedItem = null; // Sürüklenen öğeyi takip etmek için

    // --- ANA FONKSİYONLAR ---

    function renderItinerary() {
        itineraryList.innerHTML = ''; 
        currentItinerary.forEach((step, index) => {
            const stepElement = document.createElement('li');
            stepElement.className = 'itinerary-step';
            stepElement.dataset.index = index; // Sıralama için index'i sakla
            stepElement.setAttribute('draggable', 'true'); // SÜRÜKLENEBİLİR YAP
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
            poolItem.dataset.id = activity.id; // Değiştirme için id'yi sakla
            poolItem.setAttribute('draggable', 'true'); // SÜRÜKLENEBİLİR YAP
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

    // --- SÜRÜKLE-BIRAK ETKİLEŞİMLERİ ---

    // 1. Havuz Elemanları İçin Sürükleme Olayları
    function addPoolDragListeners() {
        const poolItems = document.querySelectorAll('.pool-item');
        poolItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                draggedItem = e.target;
                // Sürüklenen verinin tipini ve ID'sini sakla
                e.dataTransfer.setData('text/plain', `pool-${item.dataset.id}`);
                setTimeout(() => item.classList.add('dragging'), 0);
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });
        });
    }

    // 2. Rota Adımları İçin Sürükleme ve Bırakma Olayları
    function addItineraryDragListeners() {
        const itinerarySteps = document.querySelectorAll('.itinerary-step');
        itinerarySteps.forEach(step => {
            step.addEventListener('dragstart', (e) => {
                draggedItem = e.target;
                // Sürüklenen verinin tipini ve INDEX'ini sakla
                e.dataTransfer.setData('text/plain', `itinerary-${step.dataset.index}`);
                setTimeout(() => step.classList.add('dragging'), 0);
            });

            step.addEventListener('dragend', () => {
                step.classList.remove('dragging');
            });

            step.addEventListener('dragover', (e) => {
                e.preventDefault(); // Bırakma işlemine izin ver
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
                    // HAVUZDAN BİR ELEMAN BIRAKILDIYSA (DEĞİŞTİRME)
                    const activityId = parseInt(idOrIndex);
                    const newActivity = activityPool.find(act => act.id === activityId);
                    currentItinerary[targetIndex] = newActivity; // Rotadaki adımı değiştir
                } 
                else if (type === 'itinerary') {
                    // ROTADAN BİR ELEMAN BIRAKILDIYSA (YENİDEN SIRALAMA)
                    const draggedIndex = parseInt(idOrIndex);
                    
                    // Elemanı kaldır ve yeni yerine ekle
                    const [removedItem] = currentItinerary.splice(draggedIndex, 1);
                    currentItinerary.splice(targetIndex, 0, removedItem);
                }

                renderItinerary(); // Değişiklikten sonra rotayı yeniden çiz
            });
        });
    }

    // --- İLK YÜKLEME ---
    renderItinerary();
    renderActivityPool();
});