import React from 'react';

const FireEmbers: React.FC = () => {
    const emberCount = 50;
    const embers = Array.from({ length: emberCount });

    const emberContainerStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 9999,
    };

    const keyframes = `
        @keyframes rise {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(var(--drift));
                opacity: 0;
            }
        }
    `;

    return (
        <div style={emberContainerStyle}>
            <style>{keyframes}</style>
            {embers.map((_, i) => {
                const size = Math.random() * 3 + 1; // 1px to 4px
                // Fix: Cast the style object to React.CSSProperties to allow for the '--drift' CSS custom property,
                // which is not included in the standard type definition and was causing a TypeScript error.
                const style = {
                    position: 'absolute',
                    width: `${size}px`,
                    height: `${size}px`,
                    background: '#ffae42',
                    borderRadius: '50%',
                    boxShadow: '0 0 5px #ff8c00, 0 0 10px #ff4500',
                    bottom: '-10px',
                    left: `${Math.random() * 100}%`,
                    animation: `rise ${Math.random() * 10 + 10}s linear infinite`,
                    animationDelay: `${Math.random() * 20}s`,
                    opacity: 0,
                    '--drift': `${(Math.random() - 0.5) * 100}px`,
                } as React.CSSProperties;
                return <div key={i} style={style} />;
            })}
        </div>
    );
};

export default FireEmbers;
