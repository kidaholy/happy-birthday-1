'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Infinity as InfinityIcon } from 'lucide-react';

interface SceneHeartMomentProps {
    onComplete: () => void;
}

export default function SceneHeartMoment({ onComplete }: SceneHeartMomentProps) {
    const [isCaptured, setIsCaptured] = useState(false);

    const handleDragEnd = (event: any, info: any) => {
        // Simple threshold check: if dragged far enough to the right (e.g., > 150px)
        if (info.offset.x > 100) {
            setIsCaptured(true);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-[60vh] flex flex-col items-center justify-center relative bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl shadow-inner overflow-hidden p-8"
        >
            {!isCaptured ? (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-10 text-center"
                    >
                        <p className="font-heading text-xl text-secondary">"Something changed..."</p>
                        <p className="text-sm text-gray-500 mt-2">Guide the arrow to the heart</p>
                    </motion.div>

                    {/* Target Heart */}
                    <div className="absolute right-10 md:right-20 flex flex-col items-center">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        >
                            <Heart className="w-16 h-16 text-secondary fill-secondary drop-shadow-xl" />
                        </motion.div>
                    </div>

                    {/* Draggable Arrow */}
                    <div className="absolute left-10 md:left-20 flex items-center">
                        <div className="relative">
                            {/* Track/Guide visual */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[200px] md:w-[300px] h-1 bg-white/40 rounded-full" />

                            <motion.div
                                drag="x"
                                dragConstraints={{ left: 0, right: 250 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative z-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center cursor-hand"
                            >
                                <ArrowRight className="text-secondary" />
                            </motion.div>
                        </div>
                    </div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center space-y-6"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                        <div className="flex items-center justify-center gap-4">
                            <Heart className="w-12 h-12 text-secondary fill-secondary" />
                            <InfinityIcon className="w-12 h-12 text-accent" />
                            <Heart className="w-12 h-12 text-secondary fill-secondary" />
                        </div>
                    </motion.div>

                    <div className="space-y-4 max-w-xs">
                        <p className="font-heading text-2xl text-secondary">Heart Captured 💘</p>
                        <p className="font-body text-gray-700">
                            "That's when I realized... my heart was already yours."
                        </p>
                        <p className="text-sm font-bold text-accent">+1 Love Point</p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        onClick={onComplete}
                        className="px-8 py-2 bg-secondary text-white rounded-full hover:bg-opacity-90 shadow-lg mt-4"
                    >
                        Continue
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
}
