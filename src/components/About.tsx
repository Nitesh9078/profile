import React, { useState } from 'react';
import AboutModal from './AboutModal';
import Mainpng from '../assets/main.png';
import overlappingpng from '../assets/overlapping.png';
import circularpng from '../assets/circular.png';
const ExperienceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const UiUxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const ProblemSolverIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);


const About: React.FC = () => {
    const skills = ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", "Figma", "UI/UX Design"];
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section id="about" className="py-24 bg-white dark:bg-gray-850">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16 text-dark dark:text-white">About Me</h2>
                    <div className="grid md:grid-cols-5 gap-12 items-center">
                        {/* Image Collage Section */}
                        <div className="md:col-span-2 flex justify-center items-center h-80 md:h-96">
                            <div className="relative w-full max-w-xs h-full">
                                {/* Main Image */}
                                <img 
                                    src={Mainpng} 
                                    alt="Alex Doe at a professional event" 
                                    className="absolute top-0 left-0 w-[70%] h-[70%] rounded-lg shadow-2xl object-cover transition-all duration-300 ease-in-out hover:scale-105 hover:z-20"
                                />
                                {/* Smaller Overlapping Image 1 */}
                                <img 
                                    src={overlappingpng} 
                                    alt="A hobby of Alex Doe" 
                                    className="absolute bottom-0 right-0 w-[60%] h-[60%] rounded-lg shadow-xl object-cover border-4 border-white dark:border-gray-850 transition-all duration-300 ease-in-out hover:scale-105 hover:z-20"
                                />
                                 {/* Smaller Overlapping Image 2 */}
                                 <img 
                                    src={circularpng} 
                                    alt="Alex Doe working on a project" 
                                    className="absolute top-1/4 -right-10 w-40 h-40 rounded-full shadow-lg object-cover border-4 border-white dark:border-gray-850 transition-all duration-300 ease-in-out hover:scale-105 hover:z-20 hidden sm:block"
                                />
                            </div>
                        </div>
                        {/* Text Section */}
                        <div className="md:col-span-3 text-lg text-gray-600 dark:text-gray-400 space-y-6">
                            <h3 className="text-3xl font-bold text-dark dark:text-white">Hello! I'm Alex Doe.</h3>
                            <p>
                                A passionate and creative Full-Stack Web Developer with a keen eye for design. With over 5 years of experience, I specialize in building modern, responsive, and user-friendly web applications from the ground up.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center my-8">
                                {/* Card 1: Experience */}
                                <div className="group bg-secondary dark:bg-medium/50 p-6 rounded-xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/30 hover:bg-gradient-to-br from-blue-50 to-indigo-100 dark:hover:from-gray-700 dark:hover:to-gray-800 cursor-pointer border-2 border-transparent hover:border-primary/30">
                                    <div className="inline-block p-4 bg-primary/10 rounded-full mb-3 text-primary transition-all duration-500 ease-in-out group-hover:scale-115 group-hover:-translate-y-2 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-white">
                                        <ExperienceIcon />
                                    </div>
                                    <h4 className="font-semibold text-lg mt-2 text-dark dark:text-white transition-colors duration-500 group-hover:text-primary dark:group-hover:text-blue-300">5+ Years</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">Experience</p>
                                </div>
                                
                                {/* Card 2: UI/UX */}
                                <div className="group bg-secondary dark:bg-medium/50 p-6 rounded-xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/30 hover:bg-gradient-to-br from-blue-50 to-indigo-100 dark:hover:from-gray-700 dark:hover:to-gray-800 cursor-pointer border-2 border-transparent hover:border-primary/30">
                                    <div className="inline-block p-4 bg-primary/10 rounded-full mb-3 text-primary transition-all duration-500 ease-in-out group-hover:scale-115 group-hover:-translate-y-2 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-white">
                                        <UiUxIcon />
                                    </div>
                                    <h4 className="font-semibold text-lg mt-2 text-dark dark:text-white transition-colors duration-500 group-hover:text-primary dark:group-hover:text-blue-300">Intuitive</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">UI/UX Design</p>
                                </div>

                                {/* Card 3: Problem Solver */}
                                <div className="group bg-secondary dark:bg-medium/50 p-6 rounded-xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/30 hover:bg-gradient-to-br from-blue-50 to-indigo-100 dark:hover:from-gray-700 dark:hover:to-gray-800 cursor-pointer border-2 border-transparent hover:border-primary/30">
                                    <div className="inline-block p-4 bg-primary/10 rounded-full mb-3 text-primary transition-all duration-500 ease-in-out group-hover:scale-115 group-hover:-translate-y-2 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-white">
                                        <ProblemSolverIcon />
                                    </div>
                                    <h4 className="font-semibold text-lg mt-2 text-dark dark:text-white transition-colors duration-500 group-hover:text-primary dark:group-hover:text-blue-300">Creative</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">Problem Solver</p>
                                </div>
                            </div>
                            
                            <p>
                               My journey in web development began with a fascination for how things work, and it has grown into a career where I can turn complex problems into simple, beautiful, and intuitive designs. I'm always eager to learn and take on new challenges.
                            </p>

                            <div>
                                 <h4 className="font-semibold text-xl text-dark dark:text-white mb-3">Core Skills</h4>
                                 <div className="flex flex-wrap gap-2">
                                    {skills.map(skill => (
                                        <span key={skill} className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 text-sm font-semibold px-3 py-1 rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                             <div className="pt-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Know More About Me
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {isModalOpen && <AboutModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default About;