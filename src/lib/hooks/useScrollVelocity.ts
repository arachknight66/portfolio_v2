// src/lib/hooks/useScrollVelocity.ts
"use client";
import { useLenis } from "@studio-freight/react-lenis";
import { useState, useEffect } from "react";

export const useScrollVelocity = () => {
    const [velocity, setVelocity] = useState(0);

    useLenis(({ velocity }: any) => {
        // Round to avoid unnecessary re-renders of the state
        setVelocity(Math.round(velocity * 100) / 100);
    });

    return velocity;
};