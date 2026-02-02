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
            className="flex flex-col items-center justify-center space-y-10 text-center min-h-[60vh] z-10"
        >
            <motion.div
                className="relative cursor-pointer"
                onClick={onComplete}
                whileHover={{ scale: 1.05 }}
            >
                <div className="absolute inset-0 bg-red-400 blur-3xl opacity-20 animate-pulse-soft rounded-full" />
                <Heart className="w-28 h-28 text-secondary fill-secondary animate-heart-organic drop-shadow-2xl" strokeWidth={0.5} />
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="space-y-6"
            >
                <h1 className="text-5xl md:text-7xl font-romantic text-secondary drop-shadow-sm">
                    Happy Birthday, Kalye
                </h1>

                <div className="h-px w-24 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto opacity-50" />

                <p className="text-xl font-body text-gray-600 font-light tracking-wide">
                    And happy <span className="font-semibold text-secondary">6-year anniversary</span> to us.
                </p>
            </motion.div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                onClick={onComplete}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-16 text-sm uppercase tracking-[0.3em] text-gray-400 hover:text-secondary transition-colors border-b border-transparent hover:border-secondary pb-1"
            >
                Start Our Story
            </motion.button>
        </motion.div>
    );
}
