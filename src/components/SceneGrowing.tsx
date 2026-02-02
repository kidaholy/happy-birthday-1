'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SceneGrowingProps {
    onComplete: () => void;
}

export default function SceneGrowing({ onComplete }: SceneGrowingProps) {
    const [connected, setConnected] = useState(false);

    // Explicitly typing arguments as any to avoid implicit any error
    const handleDragEnd = (_: any, info: any) => {
        // Drag logic
        if (Math.abs(info.offset.x) > 50 || Math.abs(info.offset.y) > 50) {
            setConnected(true);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full h-[65vh] flex flex-col justify-center relative rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 ${connected ? 'bg-indigo-950' : 'bg-slate-100'}`}
        >
            {/* Split Background Visuals */}
            <div className={`absolute inset-0 flex transition-opacity duration-1000 ${connected ? 'opacity-20' : 'opacity-100'}`}>
                {/* Left: Medical/Clean */}
                <div className="flex-1 bg-white flex items-center justify-center p-8">
                    <div className="w-32 h-32 rounded-full border-2 border-teal-100 flex items-center justify-center">
                        <span className="text-3xl select-none">👩‍⚕️</span>
                    </div>
                </div>
                {/* Right: Tech/Modern */}
                <div className="flex-1 bg-slate-50 flex items-center justify-center p-8">
                    <div className="w-32 h-32 rounded-full border-2 border-indigo-100 flex items-center justify-center">
                        <span className="text-3xl select-none">💻</span>
                    </div>
                </div>
            </div>

            {/* Constellation Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                {!connected ? (
                    <div className="relative">
                        <p className="absolute -top-16 left-1/2 -translate-x-1/2 w-max text-slate-400 text-sm uppercase tracking-widest font-body">Connect our worlds</p>

                        {/* Drag Star */}
                        <motion.div
                            drag
                            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(255,215,0,0.5)" }}
                            className="w-12 h-12 bg-accent rounded-full shadow-lg flex items-center justify-center cursor-pointer z-50 animate-pulse-soft"
                        >
                            <Sparkles className="text-white w-6 h-6" />
                        </motion.div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center p-8 max-w-md w-full"
                    >
                        {/* Constellation Graphic (CSS Only) */}
                        <div className="relative w-full h-32 mb-8">
                            <div className="absolute left-[20%] top-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
                            <div className="absolute right-[20%] top-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '60%' }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="absolute left-[20%] top-1/2 h-0.5 bg-gradient-to-r from-white/20 via-white to-white/20 -translate-y-1/2"
                            />
                        </div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-heading text-white">Two Paths, One Sky.</h2>
                            <p className="text-indigo-200 font-body leading-relaxed">
                                "I’m so proud of the woman you’re becoming.<br />
                                <span className="text-white">And I love growing beside you.</span>"
                            </p>

                            <motion.button
                                onClick={onComplete}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3 }}
                                className="mt-4 px-8 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center gap-2 mx-auto"
                            >
                                <span>Future</span>
                                <ArrowRight size={14} />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
