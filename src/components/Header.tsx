import React, { useState, useEffect } from 'react';

interface HeaderProps {
    onNavigate: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsHeaderVisible(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoColor = 'text-dark dark:text-light';

    return (
        <header className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${isHeaderVisible
            ? 'translate-y-0 bg-light/80 dark:bg-dark/80 backdrop-blur-lg shadow-md'
            : '-translate-y-full'
            }`}>
            <div className="container mx-auto px-6 py-5 flex justify-center items-center">
                <div className="relative group inline-block">
                    <a
                        href="#home"
                        onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                        className={`text-3xl md:text-4xl font-black ${logoColor} tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-primary dark:group-hover:text-primary`}
                        aria-label="Alex Doe, return to top"
                    >
                        Alex Doe
                    </a>
                    {/* Animated Underline */}
                    <span className={`
                        absolute bottom-[-6px] left-0 w-full h-[2px] bg-primary
                        transform origin-center transition-transform duration-500 ease-out
                        ${isHeaderVisible ? 'scale-x-100' : 'scale-x-0'}
                    `}></span>
                </div>
            </div>
        </header>
    );
};

export default Header;