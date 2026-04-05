// src/components/canvas/DistortionGrid.tsx
"use client";

import React, { useRef, useEffect } from "react";

interface Point {
    x: number;      // Current X
    y: number;      // Current Y
    ox: number;     // Original X
    oy: number;     // Original Y
    vx: number;     // Velocity X
    vy: number;     // Velocity Y
}

export const DistortionGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 });
    const points = useRef<Point[]>([]);
    const animationFrame = useRef<number>();

    const settings = {
        gridSize: 40,      // Space between points
        radius: 150,      // Influence area
        relaxation: 0.9,   // Friction (0.9 = slippery)
        strength: 0.2,     // Pull back force
        mouseStrength: 0.5 // Push force
    };

    const initGrid = (width: number, height: number) => {
        const pts = [];
        for (let x = 0; x <= width; x += settings.gridSize) {
            for (let y = 0; y <= height; y += settings.gridSize) {
                pts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
            }
        }
        points.current = pts;
    };

    const update = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.clearRect(0, 0, width, height);

        // Calculate mouse velocity for ripple effect
        mouse.current.vx = mouse.current.x - mouse.current.lastX;
        mouse.current.vy = mouse.current.y - mouse.current.lastY;
        mouse.current.lastX = mouse.current.x;
        mouse.current.lastY = mouse.current.y;

        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 229, 255, 0.2)"; // Cyan Grid Line
        ctx.lineWidth = 1;

        points.current.forEach((p) => {
            // 1. Distance to mouse
            const dx = mouse.current.x - p.x;
            const dy = mouse.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // 2. Interaction Logic
            if (dist < settings.radius) {
                const force = (settings.radius - dist) / settings.radius;

                // Displacement based on distance + mouse velocity (Ripple)
                p.vx -= dx * force * settings.mouseStrength;
                p.vy -= dy * force * settings.mouseStrength;

                // Add velocity-based distortion
                p.vx += mouse.current.vx * force * 0.5;
                p.vy += mouse.current.vy * force * 0.5;
            }

            // 3. Spring back to origin
            p.vx += (p.ox - p.x) * settings.strength;
            p.vy += (p.oy - p.y) * settings.strength;

            // 4. Apply friction and update position
            p.vx *= settings.relaxation;
            p.vy *= settings.relaxation;
            p.x += p.vx;
            p.y += p.vy;

            // 5. Drawing logic - Dynamic Glow & Size
            const proximity = dist < settings.radius ? (1 - dist / settings.radius) : 0;

            // Points
            ctx.fillStyle = proximity > 0.5
                ? `rgba(0, 229, 255, ${0.3 + proximity})`
                : "rgba(0, 229, 255, 0.3)";

            const size = 1 + proximity * 3;
            ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);

            // Proximity Glow (Blur simulation)
            if (proximity > 0.6) {
                ctx.shadowBlur = 15 * proximity;
                ctx.shadowColor = "#00E5FF";
            } else {
                ctx.shadowBlur = 0;
            }
        });

        animationFrame.current = requestAnimationFrame(() => update(ctx, width, height));
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false }); // Perf optimization
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initGrid(canvas.width, canvas.height);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        handleResize();
        update(ctx, canvas.width, canvas.height);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 bg-[#020406]"
            style={{ touchAction: "none" }}
        />
    );
};