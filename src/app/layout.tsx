import "@/styles/globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { SplashScreen } from "@/components/ui/SplashScreen";

export const metadata = {
    title: "Daksh Saini // Computer Science & Physics Portfolio",
    description: "CS undergraduate at USICT with a focus on Applied Physics and Space Science.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="bg-[#020202] text-white antialiased">
            <body className="overflow-x-hidden selection:bg-cyan-500/30">
                {/* Visual Enhancements */}
                <div className="noise-overlay" />
                <div className="scanlines" />

                {/* THE SYSTEM BOOT */}
                <SplashScreen />

                <SmoothScroll>
                    {/* Persistent WebGL Layer Removed */}
                    <CustomCursor />

                    {/* Navigation */}
                    <nav className="fixed top-0 w-full p-8 z-40 flex justify-between font-mono text-[10px] tracking-[0.4em] uppercase text-white/80">
                        <span className="text-cyan-400">User // Daksh_Saini</span>
                        <div className="hidden md:flex gap-8">
                            <a href="#sector-01" className="hover:text-cyan-400 transition-colors">Home</a>
                            <a href="#tech-stack" className="hover:text-cyan-400 transition-colors">Skills</a>
                            <a href="#sector-02" className="hover:text-cyan-400 transition-colors">Projects</a>
                            <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
                            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
                            <a href="#sector-02" className="hover:text-cyan-400 transition-colors">Contact</a>
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Resume</a>
                        </div>
                    </nav>

                    {/* The DOM Layer (Will be revealed by the boot) */}
                    <main className="relative z-10 w-full">
                        {children}
                    </main>
                </SmoothScroll>
            </body>
        </html>
    );
}