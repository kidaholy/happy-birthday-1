'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Clock } from 'lucide-react';

interface SceneLibraryProps {
    onComplete: () => void;
}

export default function SceneLibrary({ onComplete }: SceneLibraryProps) {
    const [isFrozen, setIsFrozen] = useState(false);
    const controls = useAnimation();

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
            className={`w-full h-[60vh] flex flex-col items-center justify-center relative rounded-2xl shadow-xl overflow-hidden transition-colors duration-1000 ${isFrozen ? 'bg-zinc-900 border-zinc-800' : 'bg-[#F5F1E6] border-[#E8E1D1]'}`}
        >
            {/* Background Texture */}
            <div className={`absolute inset-0 opacity-10 transition-opacity duration-1000 ${isFrozen ? 'opacity-5' : 'opacity-10'}`}
                style={{ backgroundImage: 'radial-gradient(#A18E6E 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />

            {!isFrozen && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute top-10 z-20"
                >
                    <p className="text-amber-900/60 font-heading text-lg tracking-widest uppercase">Time is racing...</p>
                </motion.div>
            )}

            {/* The Clock */}
            <div className="relative z-10 cursor-pointer group" onClick={handleFreeze}>
                <motion.div
                    animate={controls}
                    className={`w-48 h-48 rounded-full border-4 ${isFrozen ? 'border-white/20 bg-zinc-800' : 'border-amber-900/10 bg-white'} shadow-2xl flex items-center justify-center relative transition-colors duration-700`}
                >
                    {/* Clock Face */}
                    <div className={`absolute inset-2 rounded-full border border-dashed ${isFrozen ? 'border-white/10' : 'border-amber-900/20'}`} />

                    <div className="w-3 h-3 bg-secondary rounded-full absolute z-20 shadow-md" />
                    <div className={`w-1 h-16 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom ${isFrozen ? 'bg-white/50' : 'bg-amber-900'} transition-colors duration-500`} />
                    <div className="w-0.5 h-20 bg-red-400 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom -rotate-12" />
                </motion.div>

                {!isFrozen && (
                    <div className="absolute -bottom-10 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity text-sm text-amber-900/50">
                        Tap only when you want it to stop
                    </div>
                )}
            </div>

            {/* Success State - Dramatic Time Freeze */}
            {isFrozen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/40 z-30 flex flex-col items-center justify-center p-8 text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="space-y-6 max-w-md"
                    >
                        <Clock className="w-10 h-10 text-white/80 mx-auto mb-4" />

                        <div className="font-heading text-white space-y-4">
                            <motion.p
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                                className="text-2xl font-light"
                            >
                                Six hours.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
                                className="text-2xl font-light"
                            >
                                No standing.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}
                                className="text-2xl font-light"
                            >
                                Just us.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }}
                                className="text-3xl text-rose-200 font-romantic"
                            >
                                Like the world stopped existing.
                            </motion.p>
                        </div>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 5 }}
                        onClick={onComplete}
                        className="mt-12 px-6 py-2 border border-white/30 text-white/80 rounded-full hover:bg-white/10 transition-colors text-sm uppercase tracking-widest"
                    >
                        Resume Time
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
}
