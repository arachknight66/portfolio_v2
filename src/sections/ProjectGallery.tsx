// src/sections/ProjectGallery.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectOverlay } from "@/components/ui/ProjectOverlay";
import { useStore } from "@/lib/store/useStore";

export const projects = [
    {
        id: "1",
        title: "DYNAMICAL_MASS",
        category: "Astrophysics",
        img: "/p1.png",
        description: "Computational pipeline for virial mass estimation of galaxy clusters.",
        fullDescription: "An algorithmic suite designed for high-precision mass estimation of galaxy clusters. Utilizing spectroscopic data from the SDSS DR16, the system performs phase-space analysis and mass function integration to resolve virial dynamics with minimal statistical noise."
    },
    {
        id: "2",
        title: "JWST_SPECTRAL",
        category: "Scientific Computing",
        img: "/p2.png",
        description: "Spectral line identification in NGC 7469 using AstroPy and MIRI data.",
        fullDescription: "Deep extraction of ionic emission kernels from James Webb Space Telescope Mid-Infrared Instrument (MIRI) spectroscopic cubes. The project utilizes AstroPy and custom signal processing to probe the kinetics of ionized gas in the active galactic nucleus of NGC 7469."
    },
    {
        id: "3",
        title: "CULTURAL_FEST_WEBSITE",
        category: "Web Development",
        img: "/anugoonj26.png",
        description: "Website for Guru Gobind Singh Indraprastha University's Annual Cultural Fest 2026.",
        fullDescription: "Designed and developed the website for Guru Gobind Singh Indraprastha University's Annual Cultural Fest 2026 with large team"
    },
];

export const ProjectGallery = () => {
    const isBooted = useStore((state) => state.isBooted);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <section className="p-10 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={isBooted ? { opacity: 1 } : { opacity: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <span className="font-mono text-neon-cyan text-[10px] tracking-[0.4em] uppercase mb-4 block">
                    Portfolio_Segments // Research_&_Dev
                </span>
                <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white">
                    MISSION_OUTPUT
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => setSelectedId(project.id)}
                    />
                ))}
            </motion.div>

            <AnimatePresence>
                {selectedId && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/95 backdrop-blur-md z-40"
                        />
                        <ProjectOverlay
                            id={selectedId}
                            project={projects.find(p => p.id === selectedId)!}
                            onClose={() => setSelectedId(null)}
                        />
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};