import React from 'react';

interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    liveUrl: string;
}

const portfolioProjects: Project[] = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce website built with React and Node.js, including payment gateway integration.",
        imageUrl: "https://picsum.photos/500/300?random=2",
        liveUrl: "#"
    },
    {
        id: 2,
        title: "Project Management Tool",
        description: "A collaborative tool to help teams manage tasks and projects efficiently, featuring a drag-and-drop interface.",
        imageUrl: "https://picsum.photos/500/300?random=3",
        liveUrl: "#"
    },
    {
        id: 3,
        title: "Personal Blog",
        description: "A clean and modern personal blog platform with a custom CMS, built using Next.js and Tailwind CSS.",
        imageUrl: "https://picsum.photos/500/300?random=4",
        liveUrl: "#"
    },
     {
        id: 4,
        title: "Data Visualization Dashboard",
        description: "An interactive dashboard for visualizing complex datasets, using D3.js and React for a dynamic experience.",
        imageUrl: "https://picsum.photos/500/300?random=5",
        liveUrl: "#"
    }
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-white dark:bg-medium rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group dark:shadow-primary/10">
        <div className="overflow-hidden">
             <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-dark dark:text-white">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
            <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-primary font-semibold transition-colors duration-300 group-hover:text-primary-dark dark:group-hover:text-blue-400"
            >
                View Project &rarr;
            </a>
        </div>
    </div>
);


const Portfolio: React.FC = () => {
    return (
        <section id="portfolio" className="py-24 bg-secondary dark:bg-dark">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-dark dark:text-white">My Portfolio</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {portfolioProjects.map(project => (
                       <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;