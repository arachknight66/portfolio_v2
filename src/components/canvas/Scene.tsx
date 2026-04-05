"use client";
import { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { TronGrid } from "./TronGrid";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { useStore } from "@/lib/store/useStore";
import { enterGrid } from "@/animations/transitions";
import { useScrollVelocity } from "@/lib/hooks/useScrollVelocity";
import * as THREE from "three";

/**
 * Cinematic Entry Controller Component
 */
const CameraController = () => {
    const { camera } = useThree();
    const isBooted = useStore((state) => state.isBooted);
    const triggered = useRef(false);

    useEffect(() => {
        if (isBooted && !triggered.current) {
            triggered.current = true;
            enterGrid(camera as THREE.PerspectiveCamera);
        }
    }, [isBooted, camera]);

    return null;
};

export const Scene = () => {
    const velocity = useScrollVelocity();

    return (
        <div className="fixed inset-0 -z-10 bg-[#020202]">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 10, 25]} fov={50} />
                <CameraController />

                <color attach="background" args={["#020202"]} />
                <fog attach="fog" args={["#020202", 5, 20]} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <TronGrid velocity={velocity} />
                </Float>

                <EffectComposer disableNormalPass>
                    <Bloom
                        luminanceThreshold={0.2}
                        mipmapBlur
                        intensity={1.5}
                        radius={0.4}
                    />
                    <Noise opacity={0.05} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Canvas>
        </div>
    );
};