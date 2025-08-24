import React, { useState } from 'react';
import { useTheme } from '../App';

interface NavLinkInfo {
    id: string;
    label: string;
}

interface HeaderProps {
    onNavigate: (sectionId: string) => void;
    navLinks: NavLinkInfo[];
}

const NavLink: React.FC<{ sectionId: string; onNavigate: (sectionId: string) => void; children: React.ReactNode; onClick?: () => void }> = ({ sectionId, onNavigate, children, onClick }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onNavigate(sectionId);
        if (onClick) {
            onClick();
        }
    };

    return (
        <a 
            href={`#${sectionId}`} 
            onClick={handleClick}
            className="font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 py-2"
        >
            {children}
        </a>
    );
}

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary focus:outline-none transition-colors duration-300"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    );
};


const Header: React.FC<HeaderProps> = ({ onNavigate, navLinks }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white/80 dark:bg-dark/80 backdrop-blur-lg shadow-md sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="text-2xl font-bold text-primary">Alex Doe</a>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                         <NavLink key={link.id} sectionId={link.id} onNavigate={onNavigate}>{link.label}</NavLink>
                    ))}
                    <ThemeToggle />
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                     <ThemeToggle />
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-dark dark:text-light focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white dark:bg-gray-850 shadow-lg border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col items-center space-y-4 px-6 py-4">
                        {navLinks.map(link => (
                             <NavLink key={link.id} sectionId={link.id} onNavigate={onNavigate} onClick={() => setIsMenuOpen(false)}>{link.label}</NavLink>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
