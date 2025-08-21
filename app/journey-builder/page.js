// app/journey-builder/page.js
'use client'; // Interaktif bir sayfa olduğu için bu direktif zorunlu.

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function JourneyBuilderPage() {
    // STATE'LER: Sayfanın hafızasını tutan değişkenler
    const [activityPool, setActivityPool] = useState([]);
    const [currentItinerary, setCurrentItinerary] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Veri yüklenirken bekleme durumu için

    const searchParams = useSearchParams(); // URL'deki parametreleri okumak için

    // VERİ ÇEKME VE İLK ROTA OLUŞTURMA
    useEffect(() => {
        // Bu fonksiyon, sayfa ilk yüklendiğinde sadece bir kez çalışır.
        const initializeJourney = async () => {
            setIsLoading(true);

            // 1. Tüm etkinlikleri JSON dosyasından çek
            const response = await fetch('/activities.json');
            const allActivities = await response.json();
            setActivityPool(allActivities);

            // 2. Ankete verilen cevaplara göre ilk rotayı oluştur
            let initialItinerary = [];
            if (searchParams.has('pace')) {
                // Puanlama mantığı
                let scoredActivities = allActivities.map(activity => {
                    let score = 0;
                    const props = activity.properties;
                    if (props.pace === searchParams.get('pace')) score += 2;
                    if (props.focus.includes(searchParams.get('focus'))) score += 3;
                    
                    const preferences = searchParams.getAll('preferences');
                    preferences.forEach(pref => {
                        if ((props.dietary?.includes(pref)) || (props.inclusivity?.includes(pref))) {
                            score += 5;
                        }
                    });
                    return { ...activity, score };
                });
                scoredActivities.sort((a, b) => b.score - a.score);
                initialItinerary = scoredActivities.slice(0, 3);
            } else {
                // Anket doldurulmadıysa, ilk 3 etkinliği varsayılan olarak ata
                initialItinerary = allActivities.slice(0, 3);
            }
            
            setCurrentItinerary(initialItinerary);
            setIsLoading(false);
        };

        initializeJourney();
    }, []); // Boş dizi, bu useEffect'in sadece component mount olduğunda çalışmasını sağlar.

    // SÜRÜKLE-BIRAK FONKSİYONLARI
    const handleDragStart = (e, item, sourceType, index = null) => {
        const data = { ...item, sourceType, index };
        e.dataTransfer.setData('application/json', JSON.stringify(data));
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Bırakma işlemine izin ver
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const droppedItem = JSON.parse(e.dataTransfer.getData('application/json'));
        
        const newItinerary = [...currentItinerary];

        if (droppedItem.sourceType === 'pool') {
            // Havuzdan bir eleman bırakıldıysa: Değiştir
            newItinerary[targetIndex] = droppedItem;
        } else if (droppedItem.sourceType === 'itinerary') {
            // Rotadan bir eleman bırakıldıysa: Yeniden sırala
            const [removed] = newItinerary.splice(droppedItem.index, 1);
            newItinerary.splice(targetIndex, 0, removed);
        }
        
        setCurrentItinerary(newItinerary);
    };

    // YÜKLENİYOR EKRANI
    if (isLoading) {
        return <div className="loading-screen"><h2>Your personalized journey is being prepared...</h2></div>;
    }

    // ROTA ÖZETİ HESAPLAMALARI
    const totalDuration = currentItinerary.reduce((sum, step) => sum + (step?.duration || 0), 0);
    const totalPrice = currentItinerary.reduce((sum, step) => sum + (step?.price || 0), 0);

    return (
        <div className="builder-main-content">
            <div className="builder-container">
                {/* SOL SÜTUN: ROTA */}
                <div className="itinerary-column">
                    <h2>Your Custom Journey</h2>
                    <ul id="itinerary-list">
                        {currentItinerary.map((step, index) => (
                            <li
                                key={`${step.id}-${index}`}
                                className="itinerary-step"
                                draggable
                                onDragStart={(e) => handleDragStart(e, step, 'itinerary', index)}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                <h4>{index + 1}. {step.name}</h4>
                                <p>{step.description}</p>
                                <p><strong>Duration:</strong> {step.duration} hours | <strong>Price:</strong> ${step.price}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="summary">
                        <h3>Trip Summary</h3>
                        <p>Total Duration: <span>{totalDuration}</span> hours</p>
                        <p>Estimated Price: $<span>{totalPrice}</span></p>
                        <button className="finalize-button">Finalize & Book</button>
                    </div>
                </div>

                {/* SAĞ SÜTUN: ETKİNLİK HAVUZU */}
                <div className="pool-column">
                    <h2>Activity Pool</h2>
                    <p className="instructions">Drag an activity from here and drop it onto a step on the left to customize your journey.</p>
                    <div id="activity-pool">
                        {activityPool.map(activity => (
                            <div
                                key={activity.id}
                                className="pool-item"
                                draggable
                                onDragStart={(e) => handleDragStart(e, activity, 'pool')}
                            >
                                <h4>{activity.name}</h4>
                                <p>+{activity.duration}h | +$${activity.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}