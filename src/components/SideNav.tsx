import React from 'react';

interface NavLink {
    id: string;
    label: string;
}

interface SideNavProps {
    sections: NavLink[];
    activeSection: string;
    onNavigate: (sectionId: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ sections, activeSection, onNavigate }) => {
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        onNavigate(sectionId);
    };
    
    return (
        <nav className="fixed top-1/2 right-0 transform -translate-y-1/2 z-40 pr-4 md:pr-6 hidden lg:block">
            <ul className="flex flex-col items-center">
                {sections.map((section, index) => {
                    const isLastItem = index === sections.length - 1;
                    const isActive = activeSection === section.id;

                    return (
                         <li key={section.id} className={`group relative ${isLastItem ? '' : 'mb-4'}`}>
                            <a 
                                href={`#${section.id}`}
                                onClick={(e) => handleClick(e, section.id)}
                                aria-label={`Go to ${section.label} section`}
                                className="block w-6 h-6 flex items-center justify-center"
                            >
                                <span 
                                    className={`
                                        block w-2.5 h-2.5 rounded-full bg-gray-400 dark:bg-gray-500 
                                        transition-all duration-300 ease-in-out group-hover:bg-primary group-hover:scale-150
                                        ${isActive ? 'bg-primary scale-[1.75]' : ''}
                                    `}
                                ></span>
                            </a>
                            <span className="
                                absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2 py-1 
                                bg-gray-850 text-white text-xs font-bold rounded-md 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap
                                pointer-events-none
                            ">
                                {section.label}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default SideNav;