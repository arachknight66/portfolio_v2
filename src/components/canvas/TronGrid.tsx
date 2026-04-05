"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uVelocity;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave distortion based on scroll velocity
    float dist = distance(uv, vec2(0.5));
    float wave = sin(dist * 10.0 - uTime * 2.0) * uVelocity * 0.2;
    pos.z += wave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uVelocity;
  
  void main() {
    float speed = uTime * 0.2;
    vec2 grid = fract(vUv * 40.0 + vec2(0.0, speed));
    
    float line = smoothstep(0.03, 0.0, grid.x) + smoothstep(0.97, 1.0, grid.x) +
                 smoothstep(0.03, 0.0, grid.y) + smoothstep(0.97, 1.0, grid.y);
                 
    vec3 cyan = vec3(0.0, 0.95, 1.0);
    vec3 color = cyan * line;
    
    // Add pulsing glow
    float glow = line * 0.5 * (0.8 + 0.2 * sin(uTime * 3.0));
    color += vec3(0.0, 0.6, 0.9) * glow;
    
    // Velocity-based color shift
    color += vec3(0.8, 0.0, 0.2) * abs(uVelocity) * 0.1 * line;
    
    float distance = length(vUv - 0.5) * 2.0;
    float alpha = smoothstep(1.0, 0.2, distance);
    
    gl_FragColor = vec4(color, alpha * 0.5);
  }
`;

export const TronGrid = ({ velocity = 0 }: { velocity?: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const uniforms = useRef({
        uTime: { value: 0 },
        uVelocity: { value: 0 },
    });

    useFrame((state) => {
        uniforms.current.uTime.value = state.clock.getElapsedTime();
        // Smoothly lerp towards target velocity for fluid feel
        uniforms.current.uVelocity.value += (velocity - uniforms.current.uVelocity.value) * 0.05;
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[100, 100, 64, 64]} />
            <shaderMaterial
                transparent
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms.current}
            />
        </mesh>
    );
};