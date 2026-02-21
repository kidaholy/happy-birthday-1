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
    image?: string;
}

export default function SceneMemoryMatch({ onComplete }: SceneMemoryMatchProps) {
    const [cards, setCards] = useState<Card[]>([]);
    const [revealedCount, setRevealedCount] = useState(0);
    const [activeMessage, setActiveMessage] = useState<string | null>(null);

    // Initialize cards with 6 unique memories
    useEffect(() => {
        const memories = [
            { id: 0, pairId: 0, icon: <Heart className="w-8 h-8 text-rose-500" />, label: 'ቅጽበት', message: "ያም የሚያምር ፈገግታሽ ሁሌም በልቤ አለ።", image: "/photo_2023-10-20_15-29-09 (2).jpg" },
            { id: 1, pairId: 1, icon: <Heart className="w-8 h-8 text-rose-500" />, label: 'ትዝታ', message: "ብርሃን የሆንሽበት ያ ልዩ ቀን።", image: "/photo_2025-11-08_20-41-45.jpg" },
            { id: 2, pairId: 2, icon: <Heart className="w-8 h-8 text-rose-500" />, label: 'ደስታ', message: "አቤት ስንገናኝ ደስታችን...", image: "/photo_2024-09-17_22-11-56.jpg" },
            { id: 3, pairId: 3, icon: <Heart className="w-8 h-8 text-rose-500" />, label: 'ሰላም', message: "አንቺ አጠገቤ ካለሽ ሰላሜ ሙሉ ነው።", image: "/photo_2024-09-17_22-11-58.jpg" },
            { id: 4, pairId: 4, icon: <Heart className="w-8 h-8 text-rose-500" />, label: 'ውበት', message: "ውበትሽ ከውስጥም ከውጭም ይፈሳል።", image: "/photo_2024-09-17_22-11-59.jpg" },
            { id: 5, pairId: 5, icon: <Heart className="w-8 h-8 text-rose-500" />, label: 'ፍቅር', message: "ለዘላለም የሚኖር የፍቅር ቃልኪዳን።", image: "/photo_2024-09-17_22-12-05.jpg" },
        ];

        setCards(memories.map(m => ({ ...m, isFlipped: false, isMatched: false })));
    }, []);

    const handleCardClick = (index: number) => {
        if (cards[index].isFlipped) {
            setActiveMessage(cards[index].message);
            return;
        }

        setCards(prev => prev.map((c, i) => i === index ? { ...c, isFlipped: true } : c));
        setRevealedCount(prev => prev + 1);
        setActiveMessage(cards[index].message);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center justify-center min-h-[75vh] space-y-8 relative overflow-visible py-12"
        >
            <div className="text-center space-y-2">
                <h2 className="font-heading text-3xl text-secondary">የኛ ትናንሽ ነገሮች</h2>
                <p className="text-sm text-gray-400 font-body uppercase tracking-widest italic">ታሪካችንን ለመግለጥ ምስሎቹን ንኪ</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                        onClick={() => handleCardClick(index)}
                        className="w-36 h-48 md:w-44 md:h-64 relative cursor-pointer perspective-1000 group"
                        whileHover={{ scale: 1.02 }}
                    >
                        {/* Front (Hidden - Pink Card) */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-rose-200 to-rose-300 rounded-2xl shadow-xl border-4 border-white flex items-center justify-center backface-hidden z-10"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                        >
                            <div className="absolute inset-4 border border-white/40 rounded-xl" />
                            <Heart className="text-white w-12 h-12 animate-pulse-soft opacity-80" />
                        </div>

                        {/* Back (Revealed - Photo) */}
                        <div
                            className="absolute inset-0 bg-white border-4 border-white rounded-2xl shadow-2xl flex flex-col items-center justify-center backface-hidden overflow-hidden"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                            <img src={card.image} alt="Memory" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                                <span className="text-white text-xs font-heading tracking-widest uppercase">{card.label}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Reward Overlay */}
            <AnimatePresence>
                {activeMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                        onClick={() => setActiveMessage(null)}
                    >
                        <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-sm w-full text-center space-y-6" onClick={(e) => e.stopPropagation()}>
                            {(() => {
                                const activeCard = cards.find(c => c.message === activeMessage);
                                return activeCard?.image && (
                                    <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
                                        <img src={activeCard.image} alt="Memory" className="object-cover w-full h-full" />
                                    </div>
                                );
                            })()}

                            <p className="font-romantic text-3xl text-secondary leading-relaxed px-2">"{activeMessage}"</p>

                            <button
                                onClick={() => setActiveMessage(null)}
                                className="px-8 py-2 bg-rose-50 text-secondary rounded-full text-sm font-heading uppercase tracking-widest hover:bg-rose-100 transition-colors"
                            >
                                ዝጋ
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {revealedCount === 6 && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={onComplete}
                    className="px-12 py-4 bg-secondary text-white rounded-full flex items-center gap-3 hover:bg-[#8B3A44] hover:scale-105 transition-all shadow-2xl group"
                >
                    <span className="font-heading uppercase tracking-[0.2em] text-sm">ወደ መጨረሻው ጉዞ</span>
                    <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
                </motion.button>
            )}
        </motion.div>
    );
}
