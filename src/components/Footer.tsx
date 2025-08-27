import React from 'react';

// Icons are included here for component self-containment, but could be moved to a shared file.
const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.295 1.616 4.22 3.766 4.649-.693.188-1.442.225-2.167.084.629 1.956 2.445 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
);

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/></svg>
);

interface NavLinkInfo {
    id: string;
    label: string;
}

interface FooterProps {
    onNavigate: (sectionId: string) => void;
    navLinks: NavLinkInfo[];
    onOpenGameModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, navLinks, onOpenGameModal }) => {
    const currentYear = new Date().getFullYear();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        onNavigate(sectionId);
    };

    const socialLinks = [
        { label: 'LinkedIn', icon: <LinkedinIcon />, url: '#' },
        { label: 'GitHub', icon: <GithubIcon />, url: '#' },
        { label: 'Twitter', icon: <TwitterIcon />, url: '#' },
        { label: 'Instagram', icon: <InstagramIcon />, url: '#' },
    ];

    return (
        <footer className="bg-gray-850 dark:bg-dark text-gray-300">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
                    {/* Column 1: Brand */}
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold text-white mb-3">Alex Doe</h3>
                        <p className="text-gray-400 text-sm">
                           Full-Stack Web Developer & UI/UX Enthusiast, crafting digital experiences.
                        </p>
                    </div>
                    
                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
                        <nav className="flex flex-col space-y-2">
                             {navLinks.map(link => (
                                <a 
                                    key={link.label}
                                    href={`#${link.id}`} 
                                    onClick={(e) => handleNavClick(e, link.id)} 
                                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                                >
                                    {link.label}
                                </a>
                            ))}
                             <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onOpenGameModal();
                                }}
                                className="text-gray-400 hover:text-primary transition-colors duration-300"
                                role="button"
                            >
                                Fun Zone
                            </a>
                        </nav>
                    </div>

                    {/* Column 3: Follow Me */}
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Follow Me</h4>
                        <div className="flex justify-center md:justify-start space-x-4">
                            {socialLinks.map(social => (
                                <a 
                                    key={social.label}
                                    href={social.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-110"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: Get in Touch */}
                    <div>
                         <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Get in Touch</h4>
                         <a href="mailto:alex.doe@example.com" className="text-gray-400 hover:text-primary transition-colors duration-300 break-all">
                            alex.doe@example.com
                         </a>
                    </div>
                </div>
            </div>
             <div className="bg-dark/50">
                <div className="container mx-auto px-6 py-4">
                    <p className="text-gray-500 text-sm text-center">&copy; {currentYear} Alex Doe. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;