"use client";
import React from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store/useStore";

const MISSION_LOGS = [
    {
        role: "UI/UX Lead",
        organization: "Google Developer Group (GDG), USICT",
        period: "Dec 2025 – Present",
        tasks: [
            "Leading design strategy for technical events and hackathons.",
            "Managing and mentoring design team members.",
            "Overseeing end-to-end design processes from ideation to implementation."
        ],
        type: "LEADERSHIP"
    },
    {
        role: "Design Team Member",
        organization: "Google Developer Group (GDG), USICT",
        period: "Oct 2024 – Nov 2025",
        tasks: [
            "Designed branding assets and digital content for workshops and events.",
            "Maintained consistent visual identity across multiple platforms."
        ],
        type: "CORE_MEMBER"
    }
];

export const Experience = () => {
    const isBooted = useStore((state) => state.isBooted);

    return (
        <section id="experience" className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={isBooted ? { opacity: 1 } : { opacity: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <span className="font-mono text-neon-cyan text-[10px] tracking-[0.4em] uppercase mb-4 block">
                    System_Log // Mission_Experience
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display uppercase tracking-tight text-white font-bold">
                    OPERATIONAL_HISTORY
                </h2>
            </motion.div>

            <div className="space-y-12">
                {MISSION_LOG_ITEMS.map((log, i) => (
                    <MissionItem key={log.role} log={log} index={i} isBooted={isBooted} />
                ))}
            </div>
        </section>
    );
};

const MISSION_LOG_ITEMS = MISSION_LOGS;

const MissionItem = ({ log, index, isBooted }: { log: typeof MISSION_LOGS[0]; index: number; isBooted: boolean }) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={isBooted ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ delay: index * 0.15, duration: 0.8 }}
        viewport={{ once: true }}
        className="relative pl-12 border-l border-white/5 pb-12"
    >
        {/* Node Point */}
        <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] bg-neon-cyan rounded-full shadow-[0_0_8px_#00E5FF]" />
        
        <div className="flex flex-col md:flex-row md:justify-between items-start mb-6">
            <div>
                <span className="font-mono text-[10px] text-neon-cyan/60 uppercase tracking-widest block mb-2">
                    {log.type} // {log.period}
                </span>
                <h3 className="text-2xl font-display uppercase text-white font-medium">
                    {log.role}
                </h3>
                <p className="font-mono text-[10px] text-slate-500 uppercase mt-1">
                    {log.organization}
                </p>
            </div>
        </div>

        <ul className="space-y-3">
            {log.tasks.map((task, i) => (
                <motion.li 
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + (i * 0.2) }}
                    className="flex items-start gap-3 text-slate-400 text-sm font-light leading-relaxed"
                >
                    <span className="text-neon-cyan mt-1 text-[8px]">●</span>
                    {task}
                </motion.li>
            ))}
        </ul>

        {/* Hover Decorator */}
        <div className="absolute left-[-1px] top-6 bottom-6 w-[2px] bg-neon-cyan/0 group-hover:bg-neon-cyan/50 transition-all duration-500" />
    </motion.div>
);
