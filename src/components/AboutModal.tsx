import React, { useEffect, useState } from 'react';
import aboutMe from "../assets/aboutMeModal.png";
const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

interface AboutModalProps {
    onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        // Duration should match the longest animation (slide-out-down is 400ms)
        setTimeout(() => {
            onClose();
        }, 400); 
    };

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              handleClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
           window.removeEventListener('keydown', handleEsc);
           document.body.style.overflow = 'unset';
        };
    }, []);

    // This creates a downloadable text file with detailed resume content.
    // In a real project, you would typically link to a PDF file in the public folder, e.g., href="/alex-doe-resume.pdf"
//     const resumeContent = `
// Alex Doe
// Full-Stack Web Developer & UI/UX Enthusiast
// alex.doe@example.com | (123) 456-7890 | linkedin.com/in/alexdoe | github.com/alexdoe

// ================================================================================

// SUMMARY
// -------
// Passionate and creative Full-Stack Web Developer with over 5 years of experience specializing in building modern, responsive, and user-friendly web applications. Proficient in the MERN stack, TypeScript, and UI/UX design principles. A dedicated problem-solver with a keen eye for detail and a drive to create exceptional digital experiences.

// SKILLS
// ------
// - Frontend: React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3
// - Backend: Node.js, Express.js, REST APIs, GraphQL
// - Databases: MongoDB, PostgreSQL, Firebase
// - Styling: Tailwind CSS, Sass, Styled Components, Material UI
// - UI/UX: Figma, Wireframing, Prototyping, User-Centered Design
// - Tools & DevOps: Git, Webpack, Docker, Vercel, Service Workers

// EXPERIENCE
// ----------
// Senior Frontend Developer | Tech Solutions Inc. | 2020 - Present
// - Led the development of a high-traffic e-commerce platform using React and Next.js, resulting in a 30% increase in user engagement.
// - Collaborated with UI/UX designers to translate Figma mockups into pixel-perfect, responsive web pages.
// - Mentored junior developers and conducted code reviews to maintain high code quality standards.

// Full-Stack Developer | Creative Agency | 2018 - 2020
// - Developed and maintained full-stack web applications for various clients, utilizing the MERN stack.
// - Built a custom project management tool with real-time collaboration features using WebSockets.
// - Integrated third-party APIs, including Stripe for payments and Google Maps for location services.

// EDUCATION
// ---------
// B.S. in Computer Science | University of Technology | 2014 - 2018

// PROJECTS
// --------
// - E-Commerce Platform: Full-featured online store with admin dashboard.
// - Project Management Tool: Collaborative Kanban-style task manager.
// - Data Visualization Dashboard: Interactive charts and graphs with D3.js.
// (For more details, please see my portfolio.)
//     `.trim();

//     // const resumeDataUri = "data:text/plain;charset=utf-8," + encodeURIComponent(resumeContent);


    return (
        <div 
            className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4 ${isClosing ? 'animate-fade-out-quick' : 'animate-fade-in-quick'}`}
            aria-labelledby="about-modal-title"
            role="dialog"
            aria-modal="true"
            onClick={handleClose}
        >
            <div 
                className={`bg-white dark:bg-gray-850 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 flex flex-col md:flex-row ${isClosing ? 'animate-slide-out-down' : 'animate-slide-in-up'}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Image Section */}
                <div className="md:w-2/5 flex-shrink-0">
                    <img 
                        src={aboutMe}
                        alt="A personal portrait of Alex Doe"
                        className="w-full h-48 md:h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
                    />
                </div>
                
                {/* Content Section */}
                <div className="relative p-6 md:p-8 flex-grow">
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1 transition-colors duration-300"
                        aria-label="Close details"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    <h2 id="about-modal-title" className="text-3xl font-bold mb-6 text-dark dark:text-white">Diving Deeper</h2>
                    
                    <div className="text-gray-600 dark:text-gray-400 space-y-4 text-base leading-relaxed">
                        <div>
                            <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">My Philosophy</h3>
                            <p>
                                I believe that the best digital experiences are born from a blend of technical excellence and human-centered design. For me, coding isn't just about writing functional logic; it's about crafting intuitive, accessible, and enjoyable journeys for the end-user. I strive to build products that are not only powerful under the hood but also a delight to interact with.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">Beyond the Code</h3>
                            <p>
                                Outside of my professional life, I'm an avid landscape photographer, which has trained my eye for composition, color, and storytelling—skills that I carry back into my design work. I'm also a firm believer in lifelong learning and constantly exploring new technologies, attending workshops, and contributing to open-source projects to stay at the cutting edge of the industry.
                            </p>
                        </div>
                         <div>
                            <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">Let's Collaborate</h3>
                            <p>
                                I am always excited to connect with like-minded professionals and explore new opportunities. If you're looking for a developer who is passionate, detail-oriented, and dedicated to quality, let's talk. For a more detailed look at my professional history and qualifications, feel free to download my resume below.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                        <a 
                            href="/Alex_Doe_Resume.pdf"
                            download="Alex_Doe_Resume.pdf"
                            className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Download Resume <DownloadIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;