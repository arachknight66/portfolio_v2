"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store/useStore";

export const Hero = () => {
    const textRef = useRef<HTMLHeadingElement>(null);
    const isBooted = useStore((state) => state.isBooted);

    useEffect(() => {
        if (!isBooted) return;
        
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let iteration = 0;
        const interval = setInterval(() => {
            if (!textRef.current) return;
            textRef.current.innerText = textRef.current.innerText
                .split("")
                .map((_, index) => {
                    if (index < iteration) return textRef.current?.dataset.value![index];
                    return letters[Math.floor(Math.random() * 36)];
                })
                .join("");

            if (iteration >= textRef.current.dataset.value!.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [isBooted]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.5,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <section id="sector-01" className="h-screen flex flex-col items-center justify-center relative">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isBooted ? "visible" : "hidden"}
                className="text-center"
            >
                <motion.span 
                    variants={itemVariants}
                    className="font-mono text-cyan-500 text-xs tracking-[0.5em] mb-4 block animate-pulse"
                >
                    PROGRAM_INITIALIZING // DAKSH_SAINI
                </motion.span>
                <motion.h1
                    variants={itemVariants}
                    ref={textRef}
                    data-value="DAKSH_SAINI"
                    className="text-8xl md:text-[10rem] font-display uppercase tracking-tighter leading-none text-white text-shadow-neon"
                >
                    DAKSH_SAINI
                </motion.h1>
                <motion.p 
                    variants={itemVariants}
                    className="max-w-2xl mx-auto mt-8 font-light text-slate-400 tracking-wide text-sm px-6 leading-relaxed"
                >
                    Second-year Computer Science undergraduate at USICT with a foundation in data analysis, Web Dev, and applied physics. Passionate about problem-solving at the intersection of technology, physics, and space science.
                </motion.p>
            </motion.div>

            {/* Scroll Indicator (Revealed last) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={isBooted ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <div className="w-[1px] h-24 bg-gradient-to-t from-cyan-500 to-transparent" />
                <span className="font-mono text-[8px] text-cyan-500/50 uppercase vertical-text">Scroll_Down</span>
            </motion.div>
        </section>
    );
};