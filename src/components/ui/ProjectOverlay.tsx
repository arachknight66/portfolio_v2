"use client";
import { motion } from "framer-motion";

export const ProjectOverlay = ({ id, project, onClose }: any) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-20">
            <motion.div
                layoutId={`card-${id}`}
                className="relative w-full max-w-5xl h-full md:h-[80vh] bg-grid-dark border border-neon-cyan/50 overflow-hidden"
                style={{ borderRadius: "2px" }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-20 right-4 md:top-8 md:right-8 z-[110] text-neon-cyan font-mono text-[10px] md:text-xs hover:text-white transition-colors bg-black/50 p-2 border border-white/5"
                >
                    [ DISCONNECT_SESSION ]
                </button>
                {/* Vertical Scrollable Container */}
                <div 
                    className="relative h-full flex flex-col overflow-y-auto scrollbar-hide md:custom-scrollbar"
                    data-lenis-prevent
                >
                    {/* Top Image Section */}
                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[450px] bg-black/60 flex items-center justify-center p-6 border-b border-white/10 shrink-0">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="relative w-full h-full border border-neon-cyan/20 group-hover:border-neon-cyan/40 transition-colors"
                        >
                            <motion.img
                                layoutId={`img-${id}`}
                                src={project.img}
                                alt={project.title}
                                className="w-full h-full object-contain"
                            />
                            {/* Scanning line effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent h-12 w-full animate-scan pointer-events-none" />
                        </motion.div>
                        
                        {/* Status Tags */}
                        <div className="absolute top-10 left-10 flex gap-2">
                            <span className="px-2 py-1 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-[8px] font-mono uppercase tracking-widest animate-pulse">
                                VISUAL_FEED_ACTIVE
                            </span>
                        </div>
                    </div>

                    {/* Bottom Data Section */}
                    <div className="w-full p-8 md:p-16">


                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                                <div>
                                    <motion.p layoutId={`cat-${id}`} className="text-neon-cyan font-mono text-xs uppercase tracking-[0.3em] mb-3">
                                        {project.category}
                                    </motion.p>
                                    <motion.h2 layoutId={`title-${id}`} className="text-3xl sm:text-4xl md:text-6xl font-display uppercase leading-none text-white">
                                        {project.title}
                                    </motion.h2>
                                </div>
                                
                                <div className="flex gap-4 font-mono text-[10px] text-neon-cyan/60">
                                    <div className="text-right">
                                        <div className="text-white/20">FILE_ID</div>
                                        <div className="text-neon-cyan">PRJ_00{id}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white/20">ACCESS_LVL</div>
                                        <div className="text-neon-cyan">ROOT</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
                                <div className="md:col-span-2 space-y-6">
                                    <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest">Mission_Briefing</h4>
                                    <p className="text-slate-300 font-light leading-relaxed text-sm md:text-lg">
                                        {project.fullDescription}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest">Diagnostic_Data</h4>
                                    <div className="space-y-3 font-mono text-[10px]">
                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                            <span className="text-slate-500">LATENCY</span>
                                            <span className="text-neon-cyan">0.002ms</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                            <span className="text-slate-500">STABILITY</span>
                                            <span className="text-neon-cyan">99.98%</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                            <span className="text-slate-500">ENCRYPTION</span>
                                            <span className="text-neon-cyan">AES-256</span>
                                        </div>
                                    </div>

                                    {project.github && (
                                        <motion.a 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                            href={project.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="mt-6 block w-full py-3 border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan font-mono text-[10px] text-center hover:bg-neon-cyan/20 hover:border-neon-cyan transition-all uppercase tracking-[0.2em]"
                                        >
                                            [ ACCESS_SOURCE_REPOSITORY ]
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};