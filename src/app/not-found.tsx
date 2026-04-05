"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#020202] flex items-center justify-center p-8 overflow-hidden relative">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12"
                >
                    <h1 className="text-8xl md:text-[12rem] font-display text-white/5 border-b border-neon-cyan/20 leading-none">
                        404
                    </h1>
                    <div className="flex items-center justify-center gap-4 -mt-10 md:-mt-16">
                        <span className="h-[2px] w-12 bg-neon-cyan/30" />
                        <h2 className="text-neon-cyan font-mono text-sm md:text-xl uppercase tracking-[0.5em] animate-pulse">
                            SECTOR_NOT_FOUND
                        </h2>
                        <span className="h-[2px] w-12 bg-neon-cyan/30" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="space-y-8"
                >
                    <p className="text-slate-400 font-mono text-xs md:text-sm leading-relaxed max-w-md mx-auto">
                        The requested navigation coordinates do not exist in the current grid. Authentication required for deep-sector access.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 bg-neon-cyan text-black font-mono font-bold text-xs uppercase tracking-widest transition-all"
                            >
                                [ RETURN_TO_HOME_SECTOR ]
                            </motion.button>
                        </Link>
                        
                        <div className="flex gap-2">
                            <span className="w-1 h-1 bg-neon-cyan/40 animate-ping" />
                            <span className="w-1 h-1 bg-neon-cyan/20" />
                            <span className="w-1 h-1 bg-neon-cyan/10" />
                        </div>
                    </div>
                </motion.div>
            </div>
            
            {/* Visual Glitch Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan/5 animate-scan pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-neon-cyan/5 animate-scan pointer-events-none delay-1000" />
        </div>
    );
}
