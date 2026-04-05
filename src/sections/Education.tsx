"use client";
import React from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store/useStore";
import { GraduationCap, BookOpen, Calendar } from "lucide-react";

const EDUCATION_LOGS = [
    {
        institution: "University School of Information, Communication & Technology (USICT), GGSIPU",
        degree: "B.Tech – Computer Science and Engineering",
        period: "2024 – 2028",
        status: "CURRENTLY IN 2ND YEAR",
        details: "Actively involved in technical and developer communities.",
        icon: <GraduationCap size={20} />
    },
    {
        institution: "Dev Samaj Modern School, Nehru Nagar",
        degree: "CBSE (PCM + Computer Science)",
        period: "Finished 2024",
        status: "COMPLETED",
        details: "Strong foundation in Mathematics, Physics, and Computer Science.",
        icon: <BookOpen size={20} />
    }
];

export const Education = () => {
    const isBooted = useStore((state) => state.isBooted);

    return (
        <section id="education" className="py-20 px-10 max-w-7xl mx-auto min-h-[50vh] flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={isBooted ? { opacity: 1 } : { opacity: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <span className="font-mono text-neon-cyan text-[10px] tracking-[0.4em] uppercase mb-4 block">
                    System_Archive // Education_History
                </span>
                <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white font-bold">
                    ACADEMIC_NODES
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {EDUCATION_LOG_ITEMS.map((edu, i) => (
                    <EducationCard key={edu.institution} edu={edu} index={i} isBooted={isBooted} />
                ))}
            </div>
        </section>
    );
};

const EDUCATION_LOG_ITEMS = EDUCATION_LOGS;

const EducationCard = ({ edu, index, isBooted }: { edu: typeof EDUCATION_LOGS[0]; index: number; isBooted: boolean }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={isBooted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ delay: index * 0.2, duration: 0.8, ease: "circOut" }}
        viewport={{ once: true }}
        className="group relative p-8 border border-white/5 bg-white/[0.02] hover:bg-neon-cyan/[0.03] transition-all duration-500 overflow-hidden"
    >
        {/* Connection Pulse */}
        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 group-hover:text-neon-cyan transition-all">
            {edu.icon}
        </div>

        <div className="mb-6">
            <span className="flex items-center gap-2 font-mono text-[10px] text-neon-cyan/60 uppercase tracking-widest mb-2">
                <Calendar size={10} />
                {edu.period} // {edu.status}
            </span>
            <h3 className="text-xl md:text-2xl font-display uppercase text-white leading-tight mb-2 group-hover:text-white transition-colors">
                {edu.institution}
            </h3>
            <p className="font-mono text-sm text-neon-cyan/80">
                {edu.degree}
            </p>
        </div>

        <p className="text-slate-400 text-sm font-light leading-relaxed max-w-md">
            {edu.details}
        </p>

        {/* Decorative Scanner Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neon-cyan/0 group-hover:bg-neon-cyan/40 transition-all duration-700 overflow-hidden">
            <div className="w-full h-full animate-scan" style={{ animation: "scan 2s linear infinite" }} />
        </div>

        {/* High-tech Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-neon-cyan/50 transition-colors" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-neon-cyan/50 transition-colors" />
    </motion.div>
);
