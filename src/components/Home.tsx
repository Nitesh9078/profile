import React from 'react';
import homepng from '../assets/home.png';
interface HomeProps {
    onNavigate: (sectionId: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    return (
        <section 
            id="home" 
            className="relative min-h-screen flex items-center justify-center text-center text-white bg-cover bg-center bg-fixed bg-dark"
            style={{ backgroundImage: `url('${homepng}')` }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 p-6">
                <h1 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-lg opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Alex Doe</h1>
                <p className="text-xl md:text-2xl font-light mb-8 drop-shadow-md opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Full-Stack Web Developer & UI/UX Enthusiast</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => onNavigate('portfolio')}
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl opacity-0 animate-fade-in-up w-full sm:w-auto"
                        style={{ animationDelay: '0.6s' }}
                    >
                        View My Work
                    </button>
                    <button 
                        onClick={() => onNavigate('contact')}
                        className="bg-transparent border-2 border-white hover:bg-white hover:text-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 opacity-0 animate-fade-in-up w-full sm:w-auto"
                        style={{ animationDelay: '0.8s' }}
                    >
                        Contact Me
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Home;