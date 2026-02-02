'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Infinity as InfinityIcon } from 'lucide-react';

interface SceneHeartMomentProps {
    onComplete: () => void;
}

export default function SceneHeartMoment({ onComplete }: SceneHeartMomentProps) {
    const [isCaptured, setIsCaptured] = useState(false);

    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x > 100) {
            setIsCaptured(true);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-[60vh] flex flex-col items-center justify-center relative bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl shadow-inner overflow-hidden p-8"
        >
            {!isCaptured ? (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        className="absolute top-12 text-center"
                    >
                        <p className="font-heading text-2xl text-secondary/70 italic">"Something changed..."</p>
                    </motion.div>

                    {/* Target Heart - With Pulse Aura */}
                    <div className="absolute right-10 md:right-24 flex flex-col items-center justify-center">
                        <div className="absolute w-32 h-32 bg-rose-300/20 rounded-full animate-pulse-soft blur-xl" />
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Heart className="w-20 h-20 text-secondary fill-secondary drop-shadow-2xl" strokeWidth={0} />
                        </motion.div>
                    </div>

                    {/* Draggable Arrow - Smoother Visuals */}
                    <div className="absolute left-10 md:left-24 flex items-center">
                        <div className="relative group">
                            {/* Guide Path */}
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-[180px] md:w-[250px] h-[2px] bg-gradient-to-r from-secondary/50 to-transparent" />

                            <motion.div
                                drag="x"
                                dragConstraints={{ left: 0, right: 250 }}
                                dragElastic={0.1}
                                onDragEnd={handleDragEnd}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative z-10 w-14 h-14 bg-white rounded-full shadow-lg border border-rose-100 flex items-center justify-center cursor-grab active:cursor-grabbing hover:shadow-xl transition-shadow"
                            >
                                <ArrowRight className="text-secondary w-6 h-6" />
                            </motion.div>

                            <p className="absolute -bottom-8 left-0 w-max text-xs text-secondary/40 font-body opacity-0 group-hover:opacity-100 transition-opacity">
                                Bring it to her heart
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-center space-y-8 z-20"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 12 }}
                        className="relative"
                    >
                        {/* Petal Burst Effect (Simulated with circles) */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 0, y: 0 }}
                                animate={{ opacity: [1, 0], x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100 }}
                                transition={{ duration: 1, delay: 0.1 }}
                                className="absolute inset-0 w-4 h-4 bg-rose-400 rounded-full blur-[1px]"
                            />
                        ))}

                        <div className="bg-white/80 p-6 rounded-full shadow-2xl backdrop-blur-sm border border-rose-100">
                            <InfinityIcon className="w-16 h-16 text-secondary" strokeWidth={1.5} />
                        </div>
                    </motion.div>

                    <div className="space-y-4 max-w-sm">
                        <p className="font-heading text-3xl text-secondary">Captured.</p>
                        <p className="font-body text-gray-700 leading-relaxed">
                            "That's when I realized... <br />
                            <span className="font-semibold text-secondary">my heart was already yours.</span>"
                        </p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5 }}
                        onClick={onComplete}
                        className="px-8 py-3 bg-secondary text-white rounded-full hover:bg-[#8B3A44] transition-colors shadow-lg font-heading tracking-wide"
                    >
                        Forever
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
}
