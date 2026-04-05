import gsap from 'gsap';
import * as THREE from 'three';

/**
 * Cinematic Camera Entry Animation
 */
export const enterGrid = (camera: THREE.PerspectiveCamera) => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 3 } });

    // 1. Initial Position (Far Away & Angled)
    camera.position.set(0, 10, 25);
    camera.lookAt(0, 0, 0);

    // 2. The Great Glide (Into active position)
    tl.to(camera.position, {
        z: 8,
        y: 2,
        x: 0,
        ease: "power3.inOut"
    });

    // 3. UI Reveal Staggering
    tl.to(".ui-reveal", {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 2,
        ease: "expo.out"
    }, "-=1.5");

    return tl;
};

/**
 * Section Transition Stagger
 */
export const staggerChildren = (parent: string) => {
    gsap.fromTo(`${parent} > div`,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1.2, ease: "power4.out" }
    );
};