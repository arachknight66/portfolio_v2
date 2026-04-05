"use client";
import React from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store/useStore";

const SKILL_CATEGORIES = [
    {
        title: "Scientific Computing",
        skills: ["AstroPy", "NumPy", "Pandas", "Matplotlib", "SciPy"],
        icon: ""
    },
    {
        title: "Core Programming",
        skills: ["Python", "C/C++", "Java"],
        icon: ""
    },
    {
        title: "Web Development",
        skills: ["HTML", "CSS", "JavaScript"],
        icon: ""
    },
    {
        title: "Databases & Tools",
        skills: ["PostgreSQL", "MySQL", "Git", "Linux", "Jupyter"],
        icon: ""
    }
];

export const TechStack = () => {
    const isBooted = useStore((state) => state.isBooted);

    return (
        <section id="tech-stack" className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={isBooted ? { opacity: 1 } : { opacity: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <span className="font-mono text-neon-cyan text-[10px] tracking-[0.4em] uppercase mb-4 block">
                    System_Capabilities // Tech_Stack
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-tight text-white">
                    CORE_PROTOCOLS
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {SKILL_CATEGORIES.map((cat, i) => (
                    <CategoryItem key={cat.title} category={cat} index={i} isBooted={isBooted} />
                ))}
            </div>
        </section>
    );
};

const CategoryItem = ({ category, index, isBooted }: { category: typeof SKILL_CATEGORIES[0]; index: number; isBooted: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={isBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        viewport={{ once: true }}
        className="relative p-6 md:p-8 border border-white/5 bg-white/[0.02] hover:border-neon-cyan/30 transition-colors group"
    >
        <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl">{category.icon}</span>
            <h3 className="text-xl font-display uppercase text-white tracking-widest">{category.title}</h3>
        </div>

        <div className="flex flex-wrap gap-3">
            {category.skills.map((skill) => (
                <span
                    key={skill}
                    className="px-3 py-1 font-mono text-[10px] border border-white/10 text-slate-400 group-hover:border-neon-cyan/50 group-hover:text-neon-cyan transition-colors"
                >
                    {skill}
                </span>
            ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-neon-cyan/50 transition-colors" />
    </motion.div>
);
