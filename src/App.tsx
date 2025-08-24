import React, { createContext, useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Portfolio from './components/Portfolio';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SideNav from './components/SideNav';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedTheme = window.localStorage.getItem('theme') as Theme;
            if (storedTheme) return storedTheme;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
];

const AppContent: React.FC = () => {
    const [activeSection, setActiveSection] = useState('home');
    
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Offset makes the active state change when a section is more centered in the viewport
            const offset = window.innerHeight * 0.4; 

            const currentSection = [...navLinks].reverse().find(sectionInfo => {
                const element = document.getElementById(sectionInfo.id);
                if (element) {
                    const elementTop = element.offsetTop;
                    return scrollY >= elementTop - offset;
                }
                return false;
            });

            if (currentSection && currentSection.id !== activeSection) {
                setActiveSection(currentSection.id);
            }
        };

        // Throttle scroll events to improve performance
        let timeoutId: number | null = null;
        const throttledScrollHandler = () => {
            if (timeoutId) return;
            timeoutId = window.setTimeout(() => {
                handleScroll();
                timeoutId = null;
            }, 100);
        };

        window.addEventListener('scroll', throttledScrollHandler, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', throttledScrollHandler);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [activeSection]);

    return (
        <div className="bg-light dark:bg-dark text-medium dark:text-gray-300 font-sans transition-colors duration-300">
            <Header onNavigate={scrollToSection} navLinks={navLinks} />
            <SideNav sections={navLinks} activeSection={activeSection} onNavigate={scrollToSection} />
            <main>
                <Home onNavigate={scrollToSection} />
                <About />
                <Portfolio />
                
                {/* Combined FAQ and Contact Section */}
                <section className="py-24 bg-white dark:bg-gray-850">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-x-24 gap-y-16 items-start">
                            {/* The div wrappers with IDs are for scroll-spy navigation */}
                            <div id="faq">
                                <FAQ />
                            </div>
                            <div id="contact">
                                <Contact />
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer onNavigate={scrollToSection} navLinks={navLinks} />
        </div>
    );
}

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    )
};

export default App;