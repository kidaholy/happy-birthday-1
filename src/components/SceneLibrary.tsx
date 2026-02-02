'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Clock, Book, Stars } from 'lucide-react';

interface SceneLibraryProps {
    onComplete: () => void;
}

export default function SceneLibrary({ onComplete }: SceneLibraryProps) {
    const [isFrozen, setIsFrozen] = useState(false);
    const controls = useAnimation();

    // Start spinning immediately
    useEffect(() => {
        controls.start({
            rotate: 360,
            transition: { repeat: Infinity, duration: 2, ease: "linear" }
        });
    }, [controls]);

    const handleFreeze = () => {
        if (!isFrozen) {
            setIsFrozen(true);
            controls.stop();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-[60vh] flex flex-col items-center justify-center relative bg-[#FDF5E6] rounded-xl shadow-2xl overflow-hidden border-4 border-amber-900/10"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10 flex flex-wrap gap-8 justify-center items-center content-center pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Book key={i} className="w-16 h-16 text-amber-900" />
                ))}
            </div>

            {/* Instruction */}
            {!isFrozen && (
                <div className="absolute top-8 z-20 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                    <p className="text-secondary font-heading animate-pulse">Tap the clock to freeze time! ⏳</p>
                </div>
            )}

            {/* The Clock */}
            <div className="relative z-10 p-10 cursor-pointer" onClick={handleFreeze}>
                <motion.div
                    animate={controls}
                    className="w-40 h-40 rounded-full border-8 border-amber-800 bg-white flex items-center justify-center shadow-xl relative"
                >
                    {/* Clock Face Details */}
                    <div className="w-2 h-2 bg-black rounded-full absolute z-20" />
                    <div className="w-1 h-14 bg-black absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom" />
                    <div className="w-1 h-10 bg-red-800 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom rotate-45" />

                    {/* Marryjoy Reference? Optional, keeping it subtle */}
                </motion.div>
            </div>

            {/* Success State */}
            {isFrozen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-white/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center space-y-6"
                >
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <Stars className="w-12 h-12 text-accent" />
                    </motion.div>

                    <h2 className="text-3xl font-heading text-secondary font-bold">Time Stopped.</h2>

                    <div className="space-y-2 text-gray-700 italic text-lg leading-relaxed max-w-xs">
                        <p>"Six hours."</p>
                        <p>"No standing."</p>
                        <p>"Just us..."</p>
                        <p className="font-semibold text-secondary">"like the world stopped existing."</p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        onClick={onComplete}
                        className="px-8 py-3 bg-secondary text-white rounded-full hover:bg-opacity-90 shadow-lg mt-6 font-heading"
                    >
                        Continue
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
}
