// src/components/ui/SmoothScroll.tsx
"use client";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    const lenisRef = useRef<any>();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Sync ScrollTrigger with Lenis
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        // 2. Use GSAP's ticker to drive Lenis (High Performance)
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={{
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo Out
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    );
};