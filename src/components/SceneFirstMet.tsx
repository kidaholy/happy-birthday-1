'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SceneFirstMetProps {
    onComplete: () => void;
}

export default function SceneFirstMet({ onComplete }: SceneFirstMetProps) {
    const [memories, setMemories] = useState([
        { id: 1, x: '20%', y: '30%', text: "Six years ago, we met here...", collected: false },
        { id: 2, x: '70%', y: '40%', text: "We didn't know it then...", collected: false },
        { id: 3, x: '50%', y: '60%', text: "But love had already chosen us.", collected: false }
    ]);
    const [activeMessage, setActiveMessage] = useState<string | null>(null);

    const handleCollect = (id: number) => {
        const memory = memories.find(m => m.id === id);
        if (memory && !memory.collected) {
            setMemories(prev => prev.map(m => m.id === id ? { ...m, collected: true } : m));
            setActiveMessage(memory.text);
        }
    };

    const allCollected = memories.every(m => m.collected);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-[60vh] relative bg-white/30 backdrop-blur-sm rounded-xl shadow-2xl border border-white/50 overflow-hidden"
        >
            {/* Background Placeholder - Church Ambience */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50 to-rose-50 opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <span className="text-9xl">⛪</span>
            </div>

            {/* Instruction */}
            <div className="absolute top-4 left-0 right-0 text-center z-10">
                <p className="text-sm font-body text-gray-500 bg-white/60 inline-block px-3 py-1 rounded-full uppercase tracking-widest">
                    Tap the glowing lights
                </p>
            </div>

            {/* Memory Orbs */}
            {memories.map((memory) => !memory.collected && (
                <motion.button
                    key={memory.id}
                    style={{ left: memory.x, top: memory.y }}
                    className="absolute z-20 w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center cursor-pointer"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, y: [0, -10, 0] }}
                    transition={{ y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 215, 0, 0.6)" }}
                    onClick={() => handleCollect(memory.id)}
                >
                    <Sparkles className="w-6 h-6 text-accent drop-shadow-md animate-spin-slow" />
                </motion.button>
            ))}

            {/* Message Display */}
            <AnimatePresence mode="wait">
                {activeMessage && (
                    <motion.div
                        key={activeMessage}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute bottom-20 left-4 right-4 text-center z-30 pointer-events-none"
                    >
                        <p className="font-heading text-xl md:text-2xl text-secondary drop-shadow-sm">
                            "{activeMessage}"
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Next Button */}
            {allCollected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-6 left-0 right-0 flex justify-center z-40"
                >
                    <button
                        onClick={onComplete}
                        className="px-6 py-2 bg-secondary text-white rounded-full flex items-center gap-2 hover:bg-opacity-90 shadow-lg"
                    >
                        <span>Continue</span>
                        <ArrowRight size={16} />
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
}
