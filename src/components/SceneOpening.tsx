'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface SceneOpeningProps {
    onComplete: () => void;
}

export default function SceneOpening({ onComplete }: SceneOpeningProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-8 text-center min-h-[60vh]"
        >
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    filter: ["drop-shadow(0 0 10px rgba(114, 47, 55, 0.3))", "drop-shadow(0 0 20px rgba(114, 47, 55, 0.6))", "drop-shadow(0 0 10px rgba(114, 47, 55, 0.3))"]
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="relative"
            >
                <Heart className="w-24 h-24 text-secondary fill-secondary" strokeWidth={1} />
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
            >
                <h1 className="text-4xl md:text-6xl font-heading text-secondary font-bold tracking-tight">
                    Happy Birthday, Kalye <span className="inline-block animate-bounce">🎂</span>
                </h1>
                <p className="text-xl font-body text-gray-700 italic">
                    And happy 6-year anniversary to us. <span className="text-secondary">❤️</span>
                </p>
            </motion.div>

            <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(114, 47, 55, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="mt-12 px-10 py-4 bg-secondary text-white rounded-full font-heading text-xl shadow-lg hover:bg-[#8B3A44] transition-all flex items-center gap-3 ring-2 ring-primary ring-offset-2 ring-offset-[#FFF0F5]"
            >
                <span>Start Our Story</span>
                <span className="text-2xl animate-pulse">🎮</span>
            </motion.button>
        </motion.div>
    );
}
