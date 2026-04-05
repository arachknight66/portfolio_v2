"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store/useStore";

const BOOT_LOGS = [
    "INITIALIZING_KERNEL...",
    "SYNCING_NEURAL_LINK...",
    "DECRYPTION_IN_PROGRESS...",
    "CALIBRATING_GRID_COORDINATES...",
    "ESTABLISHING_SECURE_HANDSHAKE...",
    "USER_IDENTITY: DAKSH_SAINI",
    "SYSTEM_READY",
];

export const SplashScreen = () => {
    const { isBooted, setBooted } = useStore();
    const [currentLog, setCurrentLog] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isBooted) return;

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 10);

        const logInterval = setInterval(() => {
            setCurrentLog((prev) => {
                if (prev >= BOOT_LOGS.length - 1) {
                    clearInterval(logInterval);
                    return prev;
                }
                return prev + 1;
            });
        }, 150);

        const timeout = setTimeout(() => {
            setBooted(true);
            document.body.style.overflow = "auto";
        }, 1600);

        document.body.style.overflow = "hidden";

        return () => {
            clearInterval(progressInterval);
            clearInterval(logInterval);
            clearTimeout(timeout);
        };
    }, [isBooted, setBooted]);

    return (
        <AnimatePresence>
            {!isBooted && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 0.8, ease: "circIn" }}
                    className="fixed inset-0 z-[9999] bg-[#020202] flex flex-col items-center justify-center p-6"
                >
                    <div className="w-full max-w-md">
                        <div className="font-mono text-[10px] text-neon-cyan/80 mb-8 h-32 flex flex-col justify-end">
                            {BOOT_LOGS.slice(0, currentLog + 1).map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="mb-1"
                                >
                                    {`> ${log}`}
                                </motion.div>
                            ))}
                        </div>

                        <div className="relative h-1 w-full bg-white/5 overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-neon-cyan shadow-[0_0_10px_#00E5FF]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="flex justify-between mt-4 font-mono text-[8px] text-neon-cyan/40 uppercase tracking-widest">
                            <span>Sector: 00_CORE</span>
                            <span>{progress}% Loaded</span>
                        </div>
                    </div>

                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                        <div className="w-full h-[1px] bg-neon-cyan animate-scan" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
