"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Terminal, FileText } from "lucide-react";

export const Contact = () => {
    return (
        <section id="sector-02" className="min-h-screen flex flex-col items-center justify-center p-6 md:p-10 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 w-full max-w-4xl border border-white/5 bg-black/40 backdrop-blur-xl p-6 sm:p-12 md:p-20 text-center"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1 border border-neon-cyan/30 rounded-full mb-8">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                    <span className="font-mono text-[10px] text-neon-cyan tracking-[0.2em] uppercase">Status: Available for Breach</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display uppercase tracking-tighter mb-8 text-white">
                    Establish_Connection
                </h2>

                <p className="max-w-xl mx-auto text-slate-400 font-light mb-12">
                    Looking to integrate high-performance architecture into your next digital frontier?
                    Ping the terminal below to initiate the handshake.
                </p>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    <ContactLink icon={<Mail size={20} />} label="Email" href="mailto:dakshsaini889@gmail.com" />
                    <ContactLink icon={<Github size={20} />} label="Github" href="https://github.com/arachknight66" />
                    <ContactLink icon={<Linkedin size={20} />} label="LinkedIn" href="https://linkedin.com/in/daksh889" />
                    <ContactLink icon={<FileText size={20} />} label="Resume" href="https://drive.google.com/file/d/1-6I9p6bxriLRVFLvBw2FTMFzB0FD8GlC/view?usp=sharing" />
                </div>

                {/* Decorative Terminal Line */}
                <div className="mt-20 pt-8 border-t border-white/5 flex items-center justify-between font-mono text-[8px] text-slate-500 uppercase tracking-widest">
                    <span>Protocol: SECURE_SOCKET</span>
                    <div className="flex items-center gap-4">
                        <Terminal size={10} />
                        <span>daksh@node-01:~# _</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

const ContactLink = ({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -5, color: "#00E5FF" }}
        className="flex flex-col items-center gap-3 text-slate-500 transition-colors"
    >
        <div className="p-4 border border-white/10 rounded-sm group-hover:border-neon-cyan/50 transition-colors">
            {icon}
        </div>
        <span className="font-mono text-[10px] tracking-widest uppercase">{label}</span>
    </motion.a>
);
