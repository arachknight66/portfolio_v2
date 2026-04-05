"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const lineXRef = useRef<HTMLDivElement>(null);
    const lineYRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const handleTouchCheck = () => {
            setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
        };
        handleTouchCheck();

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const lineX = lineXRef.current;
        const lineY = lineYRef.current;
        if (!cursor || !follower || !lineX || !lineY) return;

        // Optimized GSAP setters
        const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

        const xToFollower = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power2.out" });
        const yToFollower = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power2.out" });

        const xToLine = gsap.quickTo(lineX, "x", { duration: 0.2, ease: "power3" });
        const yToLine = gsap.quickTo(lineY, "y", { duration: 0.2, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            xToCursor(e.clientX);
            yToCursor(e.clientY);
            xToFollower(e.clientX);
            yToFollower(e.clientY);
            xToLine(e.clientX);
            yToLine(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.closest("button") ||
                target.closest("a") ||
                target.closest('[data-cursor="hover"]');

            setIsHovered(!!isClickable);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    if (isTouchDevice) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Grid Crosshair Lines */}
            <div
                ref={lineXRef}
                className="fixed top-0 bottom-0 w-[1px] bg-neon-cyan/10"
            />
            <div
                ref={lineYRef}
                className="fixed left-0 right-0 h-[1px] bg-neon-cyan/10"
            />

            {/* Precision Core */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-neon-cyan rounded-none pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00E5FF]"
            />

            {/* TRON Brackets Follower */}
            <div
                ref={followerRef}
                className={`fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out
                    ${isHovered ? "w-10 h-10 border-0" : "w-14 h-14 border-0"}
                `}
            >
                {/* 4 Corner Brackets */}
                <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan transition-all duration-300 ${isHovered ? "w-4 h-4" : "w-2 h-2 opacity-50"}`} />
                <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-cyan transition-all duration-300 ${isHovered ? "w-4 h-4" : "w-2 h-2 opacity-50"}`} />
                <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-cyan transition-all duration-300 ${isHovered ? "w-4 h-4" : "w-2 h-2 opacity-50"}`} />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan transition-all duration-300 ${isHovered ? "w-4 h-4" : "w-2 h-2 opacity-50"}`} />

                {/* Inner Scanning Bar */}
                <div className={`absolute inset-0 bg-neon-cyan/5 transition-all duration-500 overflow-hidden ${isHovered ? "opacity-100" : "opacity-0"}`}>
                    <div className="w-full h-[1px] bg-neon-cyan/40 animate-scan" style={{ animation: "scan 1s linear infinite" }} />
                </div>
            </div>

            <style jsx global>{`
                @keyframes scan {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(100vh); }
                }
            `}</style>
        </div>
    );
};