'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart } from 'lucide-react';

interface SceneFinalProps {
    onComplete: () => void;
}

export default function SceneFinal({ onComplete }: SceneFinalProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isRevealed) {
            if (count < 6) {
                const timer = setTimeout(() => setCount(c => c + 1), 600);
                return () => clearTimeout(timer);
            }
        }
    }, [count, isRevealed]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[85vh] text-center space-y-8 max-w-lg mx-auto p-4 relative z-10 py-12"
        >
            {!isRevealed ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center space-y-12"
                >
                    <div className="text-center space-y-2">
                        <p className="text-gray-500 uppercase tracking-widest text-sm">ዛሬ...</p>
                        <p className="font-romantic text-4xl text-secondary">የኛ ዓመታት</p>
                    </div>

                    <motion.div
                        key={count}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1 }}
                        className="font-heading text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent"
                    >
                        {count}
                    </motion.div>

                    {count === 6 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="cursor-pointer group relative"
                            onClick={() => setIsRevealed(true)}
                        >
                            <Gift className="w-24 h-24 text-secondary animate-bounce" strokeWidth={1} />
                            <div className="absolute inset-0 bg-accent/20 blur-xl animate-pulse-soft" />
                            <p className="mt-4 text-gray-400 text-sm uppercase tracking-widest group-hover:text-secondary transition-colors">ለአንቺ ምኞት</p>
                            <br />
                            <p className="text-xs text-secondary/50">(ይሄንን ንኪው)</p>
                        </motion.div>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-20 bg-white/80 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-md border border-white/60 text-center max-w-4xl w-full"
                >
                    {/* Decorative Elements */}
                    <div className="absolute -top-6 -left-6 w-16 h-16 border-t-4 border-l-4 border-secondary/20 rounded-tl-3xl" />
                    <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-4 border-r-4 border-secondary/20 rounded-br-3xl" />

                    <h2 className="font-romantic text-4xl md:text-5xl text-secondary mb-8">ቃልዬ,</h2>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Slideshow */}
                        <div className="relative w-full aspect-[4/5] bg-gray-50 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                            <div className="w-full h-full relative overflow-hidden bg-white">
                                <SlideShow />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-6 font-body text-gray-600 leading-loose text-lg text-left">
                            <p>ቃልዬ, የኔ ምርጥ ስጦታ... ሕይወት በራሷ ውብ ናት፣ ከአንቺ ጋር ስትሆን ግን እውነተኛ ትርጉም ታገኛለች።</p>
                            <p>ደስታሽ ደስታዬ፣ ስኬትሽ ኩራቴ፣ ሰላምሽ ደግሞ መረጋጋቴ ነው።</p>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="pt-6"
                            >
                                <p className="font-heading text-2xl text-secondary italic">"ያንን ሁሉ ሕይወት... ከአንቺ ጋር ብቻ ነው መኖር የምፈልገው።"</p>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.5 }}
                                onClick={onComplete}
                                className="mt-8 px-10 py-3 bg-gradient-to-r from-secondary to-[#8B3A44] text-white rounded-full hover:shadow-lg hover:scale-105 transition-all uppercase tracking-widest text-sm flex items-center gap-3 w-fit"
                            >
                                <span>ይህ የኛ ቃልኪዳን ነው</span>
                                <Heart className="w-4 h-4 fill-white" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

function SlideShow() {
    const images = [
        "/photo_2021-09-09_18-36-49.jpg",
        "/photo_2021-12-02_15-17-07.jpg",
        "/photo_2023-10-20_15-29-09.jpg",
        "/photo_2024-02-06_07-39-30.jpg",
        "/photo_2024-04-23_10-13-46.jpg",
        "/photo_2024-09-17_22-12-04.jpg",
        "/photo_2025-02-19_15-20-21.jpg",
        "/photo_2025-02-19_15-20-27.jpg",
        "/photo_2025-10-12_09-47-22.jpg",
        "/photo_2025-11-08_20-41-45.jpg"
    ];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-full">
            <AnimatePresence mode='wait'>
                <motion.img
                    key={current}
                    src={images[current]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Memory"
                />
            </AnimatePresence>
            <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] uppercase tracking-widest text-gray-400">
                Memory {current + 1} of {images.length}
            </div>
        </div>
    );
}

