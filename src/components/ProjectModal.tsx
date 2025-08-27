import React, { useEffect, useState } from 'react';
import type { Project } from './Portfolio';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);


const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 400); // Duration should match the longest animation
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

    return (
        <div 
            className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4 ${isClosing ? 'animate-fade-out-quick' : 'animate-fade-in-quick'}`}
            aria-labelledby="project-modal-title"
            role="dialog"
            aria-modal="true"
            onClick={handleClose}
        >
            <div 
                className={`bg-white dark:bg-gray-850 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${isClosing ? 'animate-slide-out-down' : 'animate-slide-in-up'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="relative">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-56 md:h-72 object-cover rounded-t-xl" />
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-300"
                        aria-label="Close project details"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-6 md:p-8">
                    <h2 id="project-modal-title" className="text-3xl font-bold mb-4 text-dark dark:text-white">{project.title}</h2>
                    
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-dark dark:text-white">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                           {project.technologies.map(tech => (
                               <span key={tech} className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 text-sm font-semibold px-3 py-1 rounded-full">
                                   {tech}
                               </span>
                           ))}
                       </div>
                    </div>
                    
                    <div className="text-gray-600 dark:text-gray-400 mb-8 space-y-4">
                         <p>{project.longDescription}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg w-full">
                            View Live Site <ExternalLinkIcon />
                        </a>
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 dark:bg-medium dark:hover:bg-gray-850 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg w-full">
                            View Code <GithubIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProjectModal;