'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Globe, Star, ArrowRight } from 'lucide-react';

interface SceneGrowingProps {
    onComplete: () => void;
}

export default function SceneGrowing({ onComplete }: SceneGrowingProps) {
    const [starsConnected, setStarsConnected] = useState(0);
    const totalStars = 3;

    // Simulate drag connection by just checking if dragged "enough" or to center
    // We'll use a simplified click/drag interaction

    // Explicitly typing arguments as any to avoid implicit any error
    const handleDragEnd = (_: any, info: any) => {
        // If dragged towards center (y-axis movement or x depending on layout)
        // Let's say if moved > 50px
        if (Math.abs(info.offset.x) > 50 || Math.abs(info.offset.y) > 50) {
            setStarsConnected(prev => Math.min(prev + 1, totalStars));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-[70vh] flex flex-col items-center justify-center relative bg-gradient-to-b from-blue-50 to-indigo-50 rounded-xl shadow-2xl overflow-hidden"
        >
            <div className="absolute inset-0 flex">
                {/* Left Side: Medicine */}
                <div className="flex-1 bg-white/40 flex flex-col items-center justify-center p-4 border-r border-white/50">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                        <Stethoscope className="w-16 h-16 text-teal-600" />
                    </motion.div>
                    <p className="font-heading mt-4 text-teal-800 text-center">Healing & Purpose</p>
                </div>

                {/* Right Side: Online/Tech */}
                <div className="flex-1 bg-indigo-100/40 flex flex-col items-center justify-center p-4">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}>
                        <Globe className="w-16 h-16 text-indigo-600" />
                    </motion.div>
                    <p className="font-heading mt-4 text-indigo-800 text-center">Building the Future</p>
                </div>
            </div>

            {/* Central Interaction Area */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {/* Connection Stars */}
                {starsConnected < totalStars && (
                    <div className="absolute z-20 pointer-events-auto cursor-grab active:cursor-grabbing">
                        <motion.div
                            drag
                            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            whileHover={{ scale: 1.2 }}
                            className="bg-accent rounded-full p-3 shadow-lg"
                        >
                            <Star className="w-8 h-8 text-white fill-white animate-spin-slow" />
                        </motion.div>
                        <p className="text-xs text-gray-500 mt-2 bg-white/80 px-2 rounded-full">Drag to connect</p>
                    </div>
                )}
            </div>

            {/* Progress / Success Message */}
            <div className="absolute top-10 w-full text-center px-4">
                <div className="flex justify-center gap-2 mb-2">
                    {[...Array(totalStars)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-6 h-6 ${i < starsConnected ? 'text-accent fill-accent' : 'text-gray-300'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Final Message */}
            {starsConnected >= totalStars && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-x-4 bottom-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center z-30"
                >
                    <p className="font-heading text-lg text-secondary mb-2">
                        "I’m so proud of the woman you’re becoming."
                    </p>
                    <p className="font-body text-gray-600 mb-4">
                        And I love growing beside you.
                    </p>
                    <button
                        onClick={onComplete}
                        className="px-6 py-2 bg-secondary text-white rounded-full flex items-center gap-2 mx-auto hover:bg-opacity-90"
                    >
                        <span>Continue</span>
                        <ArrowRight size={16} />
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
}
