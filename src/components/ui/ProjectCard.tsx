"use client";
import { motion } from "framer-motion";

export const ProjectCard = ({ project, onClick }: any) => {
    return (
        <motion.div
            layoutId={`card-${project.id}`}
            onClick={onClick}
            className="relative h-64 bg-grid-gray border border-white/10 overflow-hidden cursor-none group"
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
            <motion.img
                layoutId={`img-${project.id}`}
                src={project.img}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 ease-out"
            />
            <motion.div
                layoutId={`bg-${project.id}`}
                className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
            />
            <div className="absolute bottom-6 left-6">
                <motion.p layoutId={`cat-${project.id}`} className="text-[10px] text-neon-cyan font-mono mb-1 uppercase">
                    {project.category}
                </motion.p>
                <motion.h3 layoutId={`title-${project.id}`} className="text-xl font-display uppercase tracking-widest text-white">
                    {project.title}
                </motion.h3>
                <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-out">
                    <p className="mt-2 text-[10px] text-white/50 font-mono italic leading-tight">
                        {project.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};