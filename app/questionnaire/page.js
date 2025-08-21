'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuestionnairePage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const router = useRouter();

    const questions = [
        {
            key: 'pace',
            question: "What's your ideal travel pace?",
            type: 'single',
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
            type: 'multiple',
            options: [
                { text: "Vegan-Friendly Options", value: 'vegan', icon: '🌱' },
                { text: "LGBT+ Friendly Spaces", value: 'lgbt-friendly', icon: '🏳️‍🌈' }
            ]
        }
    ];

    const handleOptionSelect = (key, value, type) => {
        if (type === 'single') {
            setUserAnswers(prevAnswers => ({ ...prevAnswers, [key]: value }));
            goToNextQuestion();
        } else {
            const currentPrefs = userAnswers[key] || [];
            const newPrefs = currentPrefs.includes(value)
                ? currentPrefs.filter(p => p !== value)
                : [...currentPrefs, value];
            setUserAnswers(prevAnswers => ({ ...prevAnswers, [key]: newPrefs }));
        }
    };

    const goToNextQuestion = () => {
        const card = document.getElementById('question-card');
        card.classList.add('fade-out');
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                card.classList.remove('fade-out');
            } else {
                redirectToBuilder();
            }
        }, 400);
    };

    const redirectToBuilder = () => {
        const queryParams = new URLSearchParams();
        for (const key in userAnswers) {
            const value = userAnswers[key];
            if (Array.isArray(value)) {
                value.forEach(v => queryParams.append(key, v));
            } else {
                queryParams.set(key, value);
            }
        }
        router.push(`/journey-builder?${queryParams.toString()}`);
    };

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="wizard-container">
            <div className="progress-bar-container">
                <div id="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div id="question-card">
                <h2>{currentQuestion.question}</h2>
                <div className={`options-container ${currentQuestion.type === 'multiple' ? 'multiple-choice' : ''}`}>
                    {currentQuestion.options.map(opt => {
                        const isSelected = currentQuestion.type === 'multiple' && userAnswers[currentQuestion.key]?.includes(opt.value);
                        return (
                            <div
                                key={opt.value}
                                className={`option-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleOptionSelect(currentQuestion.key, opt.value, currentQuestion.type)}
                            >
                                <div className="icon">{opt.icon}</div>
                                <h3>{opt.text}</h3>
                            </div>
                        );
                    })}
                </div>
                {currentQuestion.type === 'multiple' && (
                    <button id="next-button" className="cta-button" onClick={goToNextQuestion}>Continue</button>
                )}
            </div>
        </div>
    );
}