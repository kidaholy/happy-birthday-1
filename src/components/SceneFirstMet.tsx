'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SceneFirstMetProps {
    onComplete: () => void;
}

export default function SceneFirstMet({ onComplete }: SceneFirstMetProps) {
    const [memories, setMemories] = useState([
        { id: 1, x: '25%', y: '35%', text: "Six years ago...", collected: false },
        { id: 2, x: '65%', y: '45%', text: "Two strangers in a holy place...", collected: false },
        { id: 3, x: '45%', y: '65%', text: "Unaware that forever had just begun.", collected: false }
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
            className="w-full h-[65vh] relative bg-[#FFF8F0] rounded-2xl shadow-2xl overflow-hidden border border-white/60 box-content"
        >
            {/* Background Ambience - God Rays */}
            <div className="absolute inset-0 god-rays opacity-40 mix-blend-soft-light" />

            {/* Church Window Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-amber-100/30 pointer-events-none" />

            <div className="absolute top-8 left-0 right-0 text-center z-10 opacity-70">
                <p className="font-romantic text-3xl text-amber-900/40">Where it began...</p>
            </div>

            {/* Memory Orbs - Slower, organic float */}
            {memories.map((memory, i) => !memory.collected && (
                <motion.div
                    key={memory.id}
                    style={{ left: memory.x, top: memory.y }}
                    className="absolute z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -15, 0],
                        x: [0, i % 2 === 0 ? 5 : -5, 0]
                    }}
                    transition={{
                        y: { repeat: Infinity, duration: 4 + i, ease: "easeInOut" },
                        x: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                        default: { duration: 1 }
                    }}
                >
                    <button
                        onClick={() => handleCollect(memory.id)}
                        className="w-16 h-16 rounded-full bg-amber-200/20 backdrop-blur-sm border border-amber-300/30 flex items-center justify-center group cursor-pointer hover:bg-amber-200/40 transition-colors"
                    >
                        <Sparkles className="w-6 h-6 text-amber-500 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    </button>
                    <div className="absolute inset-0 bg-amber-400 blur-xl opacity-20 animate-pulse-soft pointer-events-none" />
                </motion.div>
            ))}

            {/* Message Display - Elegant */}
            <AnimatePresence mode="wait">
                {activeMessage && (
                    <motion.div
                        key={activeMessage}
                        initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                        transition={{ duration: 0.8 }}
                        className="absolute bottom-24 left-6 right-6 text-center z-30 pointer-events-none"
                    >
                        <p className="font-heading text-2xl md:text-3xl text-amber-900/80 leading-relaxed italic drop-shadow-sm">
                            {activeMessage}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Next Button - Subtle */}
            <AnimatePresence>
                {allCollected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-8 left-0 right-0 flex justify-center z-40"
                    >
                        <button
                            onClick={onComplete}
                            className="group flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
                        >
                            <span className="text-xs uppercase tracking-widest text-amber-900">The feeling grew</span>
                            <ArrowRight className="w-5 h-5 text-amber-900 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
