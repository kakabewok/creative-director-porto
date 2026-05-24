'use client'

import { motion } from 'framer-motion'

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-8">

            {/* Animated arc / orbit ring */}
            <div className="relative w-16 h-16">
                <motion.div
                    className="absolute inset-0 rounded-full border border-white/10"
                />
                <motion.div
                    className="absolute inset-0 rounded-full border-t border-white/80"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                />
                {/* Inner pulsing dot */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </motion.div>
            </div>

            {/* Staggered text dots */}
            <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-1 h-1 rounded-full bg-white/40"
                        animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.18,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>
        </div>
    )
}