'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen, Coffee, Moon, Sun, Music } from 'lucide-react';

interface SceneMemoryMatchProps {
    onComplete: () => void;
}

interface Card {
    id: number;
    pairId: number;
    icon: React.ReactNode;
    label: string;
    isFlipped: boolean;
    isMatched: boolean;
    message: string;
}

export default function SceneMemoryMatch({ onComplete }: SceneMemoryMatchProps) {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchesFound, setMatchesFound] = useState(0);
    const [activeMessage, setActiveMessage] = useState<string | null>(null);

    // Initialize cards
    useEffect(() => {
        const initialCards: Omit<Card, 'id' | 'isFlipped' | 'isMatched'>[] = [
            { pairId: 1, icon: <Sun className="w-8 h-8 text-amber-500" />, label: 'Warmth', message: "You are my sunshine." },
            { pairId: 1, icon: <Sun className="w-8 h-8 text-amber-500" />, label: 'Warmth', message: "You are my sunshine." },
            { pairId: 2, icon: <Moon className="w-8 h-8 text-indigo-400" />, label: 'Peace', message: "You are my peace in the chaos." },
            { pairId: 2, icon: <Moon className="w-8 h-8 text-indigo-400" />, label: 'Peace', message: "You are my peace in the chaos." },
            { pairId: 3, icon: <Coffee className="w-8 h-8 text-rose-800" />, label: 'Moments', message: "Even doing nothing is everything." },
            { pairId: 3, icon: <Coffee className="w-8 h-8 text-rose-800" />, label: 'Moments', message: "Even doing nothing is everything." },
        ];

        // Shuffle
        const shuffled = initialCards
            .map(card => ({ ...card, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map((card, index) => ({ ...card, id: index, isFlipped: false, isMatched: false, sort: undefined }));

        setCards(shuffled as Card[]);
    }, []);

    const handleCardClick = (index: number) => {
        if (flippedIndices.length >= 2 || cards[index].isFlipped || cards[index].isMatched) return;

        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);

        setCards(prev => prev.map((c, i) => i === index ? { ...c, isFlipped: true } : c));

        if (newFlipped.length === 2) {
            const [firstIndex, secondIndex] = newFlipped;
            const firstCard = cards[firstIndex];
            const secondCard = cards[index];

            if (firstCard.pairId === secondCard.pairId) {
                setTimeout(() => {
                    setCards(prev => prev.map((c, i) => i === firstIndex || i === secondIndex ? { ...c, isMatched: true } : c));
                    setMatchesFound(prev => prev + 1);
                    setFlippedIndices([]);
                    setActiveMessage(firstCard.message);
                }, 500);
            } else {
                setTimeout(() => {
                    setCards(prev => prev.map((c, i) => i === firstIndex || i === secondIndex ? { ...c, isFlipped: false } : c));
                    setFlippedIndices([]);
                }, 1000);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center justify-center min-h-[60vh] space-y-8"
        >
            <h2 className="font-heading text-3xl text-secondary">Our Little Things</h2>

            <div className="grid grid-cols-3 gap-3 md:gap-6">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => handleCardClick(index)}
                        className="w-24 h-32 md:w-28 md:h-40 relative cursor-pointer perspective-1000"
                        whileHover={{ scale: 1.05 }}
                    >
                        {/* Front (Hidden) */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-rose-200 to-rose-300 rounded-xl shadow-lg border-2 border-white flex items-center justify-center backface-hidden"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                        >
                            <Heart className="text-white w-8 h-8 animate-pulse-soft" />
                        </div>

                        {/* Back (Revealed) */}
                        <div
                            className="absolute inset-0 bg-white border border-rose-100 rounded-xl shadow-md flex flex-col items-center justify-center backface-hidden"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                            <div className="scale-110">{card.icon}</div>
                            <span className="text-[10px] mt-3 font-body text-gray-400 uppercase tracking-widest">{card.label}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="h-16 flex items-center justify-center w-full px-8 text-center">
                <AnimatePresence mode="wait">
                    {activeMessage && (
                        <motion.p
                            key={activeMessage}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="font-romantic text-2xl text-secondary"
                        >
                            "{activeMessage}"
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {matchesFound === 3 && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={onComplete}
                    className="px-8 py-3 bg-secondary text-white rounded-full flex items-center gap-2 hover:bg-[#8B3A44] hover:scale-105 transition-all shadow-xl"
                >
                    <span>Continue</span>
                </motion.button>
            )}
        </motion.div>
    );
}
