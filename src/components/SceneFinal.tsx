'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart } from 'lucide-react';

interface SceneFinalProps {
    onComplete: () => void;
}

export default function SceneFinal({ onComplete }: SceneFinalProps) {
    const [step, setStep] = useState<'counting' | 'gift' | 'message'>('counting');
    const [count, setCount] = useState(0);

    // Fix: Using useEffect for safe timing
    useEffect(() => {
        if (step === 'counting') {
            if (count < 6) {
                const timer = setTimeout(() => setCount(c => c + 1), 600); // Slower, more dramatic count
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => setStep('gift'), 1500);
                return () => clearTimeout(timer);
            }
        }
    }, [count, step]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 max-w-lg mx-auto p-4 relative z-10"
        >
            {step === 'counting' && (
                <div className="space-y-6">
                    <p className="text-2xl font-romantic text-gray-500">Today marks...</p>
                    <motion.div
                        key={count}
                        initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ scale: 1.5, opacity: 1, filter: 'blur(0px)' }}
                        className="font-heading text-[10rem] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-br from-secondary via-rose-500 to-accent drop-shadow-md"
                    >
                        {count}
                    </motion.div>
                    <p className="text-xl font-heading text-secondary tracking-widest uppercase border-t border-secondary/20 pt-4 mt-4">
                        Years of Us
                    </p>
                </div>
            )}

            {step === 'gift' && (
                <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="cursor-pointer flex flex-col items-center group"
                    onClick={() => setStep('message')}
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full animate-pulse-soft" />
                        <Gift className="w-40 h-40 text-secondary fill-rose-50 drop-shadow-2xl" strokeWidth={0.5} />
                    </motion.div>
                    <p className="mt-8 font-body text-gray-400 group-hover:text-secondary transition-colors tracking-widest uppercase text-sm">
                        A wish for you
                    </p>
                </motion.div>
            )}

            {step === 'message' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary via-accent to-secondary" />

                    <h2 className="font-romantic text-5xl text-secondary mb-8">Kalye,</h2>

                    <div className="space-y-6 font-body text-gray-600 leading-loose text-center text-lg">
                        <p>I wish you a life full of <span className="text-secondary font-medium">happiness</span>, peace, and love.</p>
                        <p>I wish for more laughter, more memories, more moments that feel out of this world.</p>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 }}
                            className="pt-6 border-t border-gray-100"
                        >
                            <p className="font-heading text-2xl text-secondary italic">"And I want that life… with you."</p>
                        </motion.div>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 4 }}
                            onClick={onComplete}
                            className="px-8 py-3 bg-secondary text-white rounded-full hover:bg-[#8B3A44] shadow-lg flex items-center gap-3 transition-transform hover:scale-105"
                        >
                            <Heart className="w-5 h-5 fill-white" />
                            <span>This is Our Promise</span>
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
