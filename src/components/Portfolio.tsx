import React, { useState } from 'react';
import ProjectModal from './ProjectModal';
import ECOM from '../assets/ecommerceplatform.png';
import Board from '../assets/board.png';
import Blog from '../assets/personalblog.png';
import MNGT from '../assets/managementool.png';
import online from '../assets/onlinelearning.png';
import fitness from '../assets/fitnesstracker.png';
import recipe from '../assets/receipefinder.png';
import social from '../assets/socialMedia.png';

export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    imageUrl: string;
    liveUrl: string;
    repoUrl: string;
    technologies: string[];
}

const portfolioProjects: Project[] = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce website built with React and Node.js.",
        longDescription: "This project is a comprehensive e-commerce solution designed from the ground up. It features a modern, responsive user interface, a secure checkout process with Stripe integration, and a full-fledged admin dashboard for managing products, orders, and customers. The backend is built on a RESTful API architecture ensuring scalability and maintainability.",
        imageUrl: ECOM,
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/example/e-commerce",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "Tailwind CSS"]
    },
    {
        id: 2,
        title: "Project Management Tool",
        description: "A collaborative tool to help teams manage tasks and projects efficiently.",
        longDescription: "Inspired by tools like Trello and Asana, this application provides a collaborative workspace for teams. Users can create projects, define tasks, assign them to team members, and track progress through a drag-and-drop Kanban board. Real-time updates are powered by WebSockets, ensuring seamless collaboration.",
        imageUrl: MNGT,
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/example/project-management",
        technologies: ["React", "TypeScript", "Firebase", "WebSockets", "Styled Components"]
    },
    {
        id: 3,
        title: "Personal Blog",
        description: "A clean and modern personal blog platform with a custom CMS.",
        longDescription: "A fully functional blog platform built with Next.js for server-side rendering and static site generation, providing excellent performance and SEO. It features a markdown-based editor for writing posts, a comment system, and a clean, minimalist design that focuses on readability. Tailwind CSS was used for a utility-first styling approach.",
        imageUrl: Blog,
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/example/blog",
        technologies: ["Next.js", "React", "Tailwind CSS", "Markdown", "Vercel"]
    },
     {
        id: 4,
        title: "Data Visualization Dashboard",
        description: "An interactive dashboard for visualizing complex datasets using D3.js.",
        longDescription: "This dashboard allows users to explore complex datasets through interactive charts and graphs. Built with D3.js and React, it offers a dynamic and engaging user experience. Features include filterable data, various chart types (bar, line, pie), and the ability to export visualizations as images.",
        imageUrl: Board,
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/example/data-viz",
        technologies: ["React", "D3.js", "Redux", "CSS Modules"]
    },
    {
        id: 5,
        title: "Social Media App",
        description: "A mobile-first social media application with real-time chat and notifications.",
        longDescription: "This is a mobile-first social media application focusing on real-time user interaction. Key features include a live feed, instant messaging with presence indicators, and push notifications. The backend is powered by Firebase, handling authentication, database, and storage seamlessly.",
        imageUrl: social,
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/example/social-app",
        technologies: ["React Native", "Firebase", "Expo", "Redux Toolkit"]
    },
    {
        id: 6,
        title: "Recipe Finder",
        description: "A web app to discover recipes based on ingredients you have at home.",
        longDescription: "This application helps users combat food waste by suggesting recipes based on ingredients they already own. It integrates with a third-party recipe API to fetch a wide variety of meal ideas. The user interface is simple and intuitive, allowing for easy ingredient input and recipe browsing.",
        imageUrl: recipe,
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/example/recipe-finder",
        technologies: ["React", "REST API", "Context API", "Sass"]
    },
    {
        id: 7,
        title: "Fitness Tracker",
        description: "A progressive web app (PWA) to track workouts and monitor fitness progress.",
        longDescription: "A PWA designed to help users log their workouts and visualize their fitness journey. It works offline thanks to service workers and provides a native-app-like experience. Users can create custom workout routines, track sets and reps, and view their progress over time with charts.",
        imageUrl: fitness,
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/example/fitness-tracker",
        technologies: ["PWA", "React", "Chart.js", "Service Workers", "Material UI"]
    },
    {
        id: 8,
        title: "Online Learning Platform",
        description: "A platform for hosting and taking online courses, with video streaming.",
        longDescription: "This platform allows instructors to create and upload courses, while students can enroll and track their progress. It includes features like video streaming, quizzes, and course reviews. The architecture is modular, making it easy to add new features in the future.",
        imageUrl: online,
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/example/lms",
        technologies: ["Next.js", "Stripe Connect", "Prisma", "PostgreSQL", "Mux Video"]
    }
];

const Portfolio: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const openModal = (project: Project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    const INITIAL_VISIBLE_COUNT = 4;

    return (
        <section id="portfolio" className="py-24 bg-secondary dark:bg-dark">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-dark dark:text-white">My Portfolio</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {portfolioProjects.map((project, index) => {
                        const isInitiallyVisible = index < INITIAL_VISIBLE_COUNT;
                        const isVisible = isInitiallyVisible || showAll;
                        return (
                             <div 
                                key={project.id}
                                className={`
                                    bg-white dark:bg-medium rounded-lg shadow-lg overflow-hidden transform group dark:shadow-primary/10
                                    transition-all duration-700 ease-in-out hover:shadow-2xl hover:-translate-y-2
                                    ${isVisible
                                        ? 'max-h-[500px] opacity-100'
                                        : 'max-h-0 opacity-0 !p-0 !border-0'
                                    }
                                    ${isInitiallyVisible ? 'animate-fade-in-up' : ''}
                                `}
                                style={isInitiallyVisible ? { animationDelay: `${(index % 4) * 150}ms` } : {}}
                            >
                                <div className="overflow-hidden">
                                     <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-dark dark:text-white">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                                    <button 
                                        onClick={() => openModal(project)}
                                        className="inline-block text-primary font-semibold transition-colors duration-300 group-hover:text-primary-dark dark:group-hover:text-blue-400"
                                    >
                                        View Project &rarr;
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {portfolioProjects.length > INITIAL_VISIBLE_COUNT && (
                    <div className="text-center mt-16">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            {showAll ? 'Show Less' : 'View More'}
                        </button>
                    </div>
                )}
            </div>
            {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
        </section>
    );
};

export default Portfolio;