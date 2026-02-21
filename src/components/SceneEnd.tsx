'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Heart } from 'lucide-react';

export default function SceneEnd({ onRestart }: { onRestart: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[75vh] space-y-8 text-center py-12"
        >
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative"
            >
                <Heart className="w-24 h-24 text-secondary fill-secondary" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                    6
                </div>
            </motion.div>

            <h2 className="font-romantic text-5xl text-secondary">ለዘላለም፣ ከአንቺ ጋር...</h2>

            <p className="font-body text-gray-600 max-w-xs italic leading-relaxed">
                "የኛ ታሪክ እዚህ አያበቃም... <br />
                የሚቀጥሉትን ምዕራፎች አብረን እንጽፋቸዋለን።"
            </p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRestart}
                className="mt-8 px-8 py-3 border-2 border-secondary text-secondary rounded-full font-heading flex items-center gap-2 hover:bg-secondary hover:text-white transition-colors"
            >
                <RefreshCw className="w-5 h-5" />
                <span>ታሪካችንን ቀጥዪው</span>
            </motion.button>
        </motion.div>
    );
}
