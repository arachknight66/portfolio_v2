// src/components/ui/ProgramCard.tsx
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const ProgramCard = ({ title, value, status }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden border border-grid-gray bg-grid-dark/50 backdrop-blur-md p-4 transition-all hover:border-neon-cyan/50"
        >
            {/* Corner Accents (The Signature TRON detail) */}
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-neon-cyan" />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-neon-cyan" />

            {/* Header Area */}
            <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-mono text-neon-cyan/60 uppercase tracking-[0.2em]">
                    Sector // {status}
                </span>
                <div className="h-[1px] w-12 bg-grid-gray group-hover:bg-neon-cyan/30 transition-colors" />
            </div>

            {/* Content */}
            <h3 className="font-display text-2xl text-white mb-2 uppercase tracking-tight">
                {title}
            </h3>
            <p className="text-sm font-mono text-neon-cyan text-shadow-neon">
                {value}
            </p>

            {/* Hover Light Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
};