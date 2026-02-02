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

    useEffect(() => {
        if (step === 'counting') {
            if (count < 6) {
                const timer = setTimeout(() => setCount(c => c + 1), 500);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => setStep('gift'), 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [count, step]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 max-w-lg mx-auto p-4"
        >
            {step === 'counting' && (
                <div className="space-y-4">
                    <p className="text-xl font-body text-gray-600">Today isn't just your birthday...</p>
                    <motion.div
                        key={count}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1 }}
                        className="font-heading text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent"
                    >
                        {count}
                    </motion.div>
                    <p className="text-lg font-heading text-secondary">Years Together</p>
                </div>
            )}

            {step === 'gift' && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ opacity: 1 }}
                    className="cursor-pointer flex flex-col items-center"
                    onClick={() => setStep('message')}
                >
                    <motion.div
                        animate={{
                            rotate: [0, -5, 5, -5, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Gift className="w-32 h-32 text-secondary fill-rose-100" strokeWidth={1} />
                    </motion.div>
                    <p className="mt-4 font-body animate-pulse">Tap to open 💌</p>
                </motion.div>
            )}

            {step === 'message' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-rose-100"
                >
                    <h2 className="font-heading text-3xl text-secondary mb-6">Kalye,</h2>
                    <div className="space-y-4 font-body text-gray-700 leading-relaxed text-left">
                        <p>I wish you a life full of happiness, peace, and love.</p>
                        <p>I wish for more laughter, more memories, more moments that feel out of this world.</p>
                        <p className="font-semibold text-lg text-secondary pt-2">And I want that life… with you.</p>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3 }}
                            onClick={onComplete}
                            className="px-8 py-3 bg-secondary text-white rounded-full hover:bg-opacity-90 shadow-lg flex items-center gap-2"
                        >
                            <Heart className="w-5 h-5 fill-white" />
                            <span>About Us</span>
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
