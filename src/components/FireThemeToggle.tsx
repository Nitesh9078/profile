import React from 'react';

const FlameIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 01-1.898-.632l4-12a1 1 0 011.265-.633zM10 18a1 1 0 01.707.293l2 2a1 1 0 11-1.414 1.414l-2-2A1 1 0 0110 18zm-6.707-6.707a1 1 0 010-1.414l2-2a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0z" clipRule="evenodd" />
      <path d="M10.707 3.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0z" />
    </svg>
);

interface FireThemeToggleProps {
    onToggle: () => void;
    isActive: boolean;
}

const FireThemeToggle: React.FC<FireThemeToggleProps> = ({ onToggle, isActive }) => {
    return (
        <button
            id="fire-theme-toggle"
            onClick={onToggle}
            className={isActive ? 'active' : ''}
            aria-label={isActive ? "Deactivate Fire Theme" : "Activate Fire Theme"}
        >
            <FlameIcon />
        </button>
    );
};

export default FireThemeToggle;
