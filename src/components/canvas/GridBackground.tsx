// src/components/canvas/GridBackground.tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Optimized Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 gr = a0 * vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw));
    return 130.0 * dot(m, x);
  }

  void main() {
    vec2 uv = vUv;
    
    // Mouse Interaction: Distort UVs based on cursor distance
    float dist = distance(uv, uMouse);
    float strength = smoothstep(0.5, 0.0, dist);
    vec2 distortedUv = uv + strength * snoise(uv * 5.0 + uTime * 0.2) * 0.05;

    // Create the "Digital Fog" pattern
    float noise = snoise(distortedUv * 3.0 + uTime * 0.1);
    
    // TRON Scanlines
    float scanline = sin(distortedUv.y * 100.0) * 0.1;
    
    // Base Color (Deep Cyan)
    vec3 color = vec3(0.0, 0.1, 0.15);
    
    // Add Neon Highlights based on noise
    color += vec3(0.0, 0.9, 1.0) * pow(noise, 3.0) * 0.5;
    
    // Mouse Glow
    color += vec3(0.0, 0.5, 0.6) * strength * 0.3;
    
    gl_FragColor = vec4(color + scanline, 1.0);
  }
`;

// Define a custom shader material using Drei's helper
const GridShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uMouse: new THREE.Vector2(0.5, 0.5),
        uResolution: new THREE.Vector2(0, 0)
    },
    vertexShader,
    fragmentShader
);

// Register the custom material so it can be used as a JSX element <gridShaderMaterial />
extend({ GridShaderMaterial });

const BackgroundPlane = () => {
    const materialRef = useRef<any>(null);
    const { size } = useThree();

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.getElapsedTime();

            // Smoothly lerp mouse position (Normalized -1 to 1 into 0 to 1)
            materialRef.current.uMouse.x = THREE.MathUtils.lerp(
                materialRef.current.uMouse.x,
                (state.mouse.x + 1) / 2,
                0.1
            );
            materialRef.current.uMouse.y = THREE.MathUtils.lerp(
                materialRef.current.uMouse.y,
                (state.mouse.y + 1) / 2,
                0.1
            );
            materialRef.current.uResolution.set(size.width, size.height);
        }
    });

    return (
        <mesh scale={[size.width, size.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <gridShaderMaterial
                ref={materialRef}
                transparent
                // key helps with HMR for shaders during development
                key={GridShaderMaterial.key}
            />
        </mesh>
    );
};

export const GridBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-[#020406]">
            <Canvas
                orthographic
                camera={{ zoom: 1 }}
                dpr={[1, 1.5]} // Performance limit for high-DPI screens
                gl={{ antialias: false, powerPreference: "high-performance" }}
            >
                <BackgroundPlane />
            </Canvas>
        </div>
    );
};