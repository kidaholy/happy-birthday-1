'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, MessageCircle, Moon, Smile, Church, Heart } from 'lucide-react';

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
            { pairId: 1, icon: <Church className="w-8 h-8 text-secondary" />, label: 'First Meet', message: "You are my peace." },
            { pairId: 1, icon: <Church className="w-8 h-8 text-secondary" />, label: 'First Meet', message: "You are my peace." },
            { pairId: 2, icon: <Book className="w-8 h-8 text-blue-600" />, label: 'Library', message: "Even silence with you feels like home." },
            { pairId: 2, icon: <Book className="w-8 h-8 text-blue-600" />, label: 'Library', message: "Even silence with you feels like home." },
            { pairId: 3, icon: <Smile className="w-8 h-8 text-accent" />, label: 'Smiles', message: "You make life lighter." },
            { pairId: 3, icon: <Smile className="w-8 h-8 text-accent" />, label: 'Smiles', message: "You make life lighter." },
        ];

        // Shuffle
        const shuffled = initialCards
            .map(card => ({ ...card, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map((card, index) => ({ ...card, id: index, isFlipped: false, isMatched: false, sort: undefined }));

        setCards(shuffled as Card[]);
    }, []);

    const handleCardClick = (index: number) => {
        // Prevent clicking if already 2 flipped or already matched/flipped
        if (flippedIndices.length >= 2 || cards[index].isFlipped || cards[index].isMatched) return;

        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);

        // Flip visual
        setCards(prev => prev.map((c, i) => i === index ? { ...c, isFlipped: true } : c));

        if (newFlipped.length === 2) {
            const [firstIndex, secondIndex] = newFlipped;
            const firstCard = cards[firstIndex];
            const secondCard = cards[index];

            if (firstCard.pairId === secondCard.pairId) {
                // Match
                setTimeout(() => {
                    setCards(prev => prev.map((c, i) => i === firstIndex || i === secondIndex ? { ...c, isMatched: true } : c));
                    setMatchesFound(prev => prev + 1);
                    setFlippedIndices([]);
                    setActiveMessage(firstCard.message);
                }, 500);
            } else {
                // No match
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
            className="w-full flex flex-col items-center justify-center min-h-[60vh] space-y-6"
        >
            <h2 className="font-heading text-2xl text-secondary">Our Moments</h2>

            <div className="grid grid-cols-3 gap-4">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleCardClick(index)}
                        className="w-24 h-32 relative cursor-pointer perspective-1000"
                    >
                        {/* Front (Hidden state - solid color/pattern) */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-rose-300 to-rose-400 rounded-lg shadow-md flex items-center justify-center backface-hidden"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                        >
                            <Heart className="text-white/50 w-8 h-8" />
                        </div>

                        {/* Back (Revealed state) */}
                        <div
                            className="absolute inset-0 bg-white border-2 border-secondary/20 rounded-lg shadow-inner flex flex-col items-center justify-center backface-hidden"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                            {card.icon}
                            <span className="text-[10px] mt-2 font-body text-gray-500 uppercase tracking-widest">{card.label}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeMessage && (
                    <motion.div
                        key={activeMessage}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="h-12 flex items-center justify-center w-full px-4"
                    >
                        <p className="font-heading text-lg text-secondary text-center">"{activeMessage}"</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {matchesFound === 3 && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={onComplete}
                    className="px-6 py-2 bg-secondary text-white rounded-full flex items-center gap-2 hover:bg-opacity-90 shadow-lg"
                >
                    <span>Continue</span>
                </motion.button>
            )}
        </motion.div>
    );
}
