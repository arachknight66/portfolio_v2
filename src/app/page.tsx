import { Hero } from "@/sections/Hero";
import { ProjectGallery } from "@/sections/ProjectGallery";
import { Contact } from "@/sections/Contact";
import { TechStack } from "@/sections/TechStack";
import { Experience } from "@/sections/Experience";
import { Education } from "@/sections/Education";

export default function Home() {
    return (
        <>
            <Hero />
            <TechStack />
            <ProjectGallery />
            <Education />
            <Experience />
            <Contact />
        </>
    );
}