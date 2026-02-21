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
            className="w-full min-h-[80vh] flex flex-col items-center justify-center relative bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl shadow-inner overflow-visible p-8 py-12"
        >
            {!isCaptured ? (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        className="absolute top-12 text-center"
                    >
                        <p className="font-heading text-2xl text-secondary/70 italic">"በአንድ ቅጽበት፣ ዓለሜ ተለወጠ..."</p>
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
                                ወደ ልቤ አምጪው
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-center space-y-6 z-20 w-full max-w-md"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative p-3 bg-white shadow-xl rotate-1 rounded-sm"
                    >
                        {/* Polaroid Effect */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden bg-gray-100">
                            {/* Note: Using standard img tag for simplicity in this context, or next/image if configured */}
                            <img
                                src="/photo_2021-09-09_18-36-49.jpg"
                                alt="Our Moment"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="pt-6 pb-2 text-center font-romantic text-3xl text-secondary/80">
                            የመጀመሪያው የልብ ምት
                        </div>
                    </motion.div>

                    <div className="space-y-4 max-w-sm">
                        <p className="font-heading text-3xl text-secondary tracking-wide">ልቤ ቆመ...</p>
                        <p className="font-body text-gray-700 leading-relaxed italic">
                            "አንቺን ሳውቅሽ ነው በትክክል መኖር የጀመርኩት... <br />
                            <span className="font-semibold text-secondary">ልቤ ለካ አስቀድሞ ያንቺ ኖሯል።</span>"
                        </p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5 }}
                        onClick={onComplete}
                        className="px-8 py-3 bg-secondary text-white rounded-full hover:bg-[#8B3A44] transition-colors shadow-lg font-heading tracking-wide"
                    >
                        ለዘላለም
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
}
