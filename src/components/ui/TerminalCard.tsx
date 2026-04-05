// src/components/ui/TerminalCard.tsx
"use client";
import { motion } from "framer-motion";

interface Props {
    title: string;
    children: React.ReactNode;
}

export const TerminalCard = ({ title, children }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative group p-[1px] rounded-lg overflow-hidden bg-cyan-500/20 will-change-transform"
        >
            {/* Animated Border Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-transparent opacity-50" />

            <div className="relative bg-[#050505]/80 backdrop-blur-xl p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <h3 className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
                        {title}
                    </h3>
                </div>
                <div className="text-slate-300 font-light leading-relaxed">
                    {children}
                </div>

                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors" />
            </div>
        </motion.div>
    );
};