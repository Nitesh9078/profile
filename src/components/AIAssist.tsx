import React, { useState } from 'react';
import { GoogleGenAI }  from "@google/genai";

const MagicWandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v1.073a8.003 8.003 0 015.657 5.657H19a1 1 0 01.954 1.284l-1.25 4.5a1 1 0 01-.954.716h-1.073a8.003 8.003 0 01-5.657 5.657V21a1 1 0 01-1.908.414l-4.5-1.25a1 1 0 01-.716-.954v-1.073A8.003 8.003 0 012.828 12H1.755a1 1 0 01-.954-1.284l1.25-4.5A1 1 0 012.954 5h1.073A8.003 8.003 0 019.684 2.172V1a1 1 0 011-1zM10 11a1 1 0 100-2 1 1 0 000 2zm0 5a1 1 0 100-2 1 1 0 000 2zm-5-5a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
);

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);


interface AIAssistProps {
    onGeneratedText: (text: string) => void;
    disabled: boolean;
    name: string;
    email: string;
}

const AIAssist: React.FC<AIAssistProps> = ({ onGeneratedText, disabled, name, email }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [lastSuccessfulPrompt, setLastSuccessfulPrompt] = useState('');

    const handleGenerate = async (useLastPrompt = false) => {
        const promptToUse = useLastPrompt ? lastSuccessfulPrompt : prompt;
        if (!promptToUse) {
            setError('Please enter a short prompt.');
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY!});
            
            let fullPrompt = `You are a helpful assistant writing a contact message for a user on a personal portfolio website.
Based on the user's intent, write a professional, friendly, and concise message that is ready to be sent.`;

            if (name) {
                fullPrompt += ` The user's name is "${name}", so the message should sound like it's from them.`;
            }
            if (email) {
                fullPrompt += ` Their email is "${email}".`;
            }
            
            fullPrompt += `\n\nUser's intent: "${promptToUse}"`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: fullPrompt,
            });
            
            if (response.text) {
                onGeneratedText(response.text.trim());
                if (!useLastPrompt) {
                    setLastSuccessfulPrompt(prompt);
                }
            } else {
                setError('No response text received from AI.');
            }
        } catch (err) {
            console.error("Gemini API error:", err);
            setError('Could not generate message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleStartOver = () => {
        setLastSuccessfulPrompt('');
        setPrompt('');
        setError('');
    };

    return (
        <div className="mb-2">
            <button
                type="button"
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                disabled={disabled}
                className="flex items-center text-sm font-semibold text-primary dark:text-blue-400 hover:text-primary-dark dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-expanded={isPanelOpen}
            >
                <MagicWandIcon />
                {isPanelOpen ? 'Close AI Assistant' : 'AI Assistant'}
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPanelOpen ? 'max-h-60 mt-2' : 'max-h-0'}`}>
                <div className="bg-gray-100 dark:bg-gray-850/50 p-4 rounded-md space-y-3">
                    {lastSuccessfulPrompt ? (
                        <div>
                             <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Generated a message based on: <span className="font-semibold italic text-gray-800 dark:text-gray-200">"{lastSuccessfulPrompt}"</span>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleGenerate(true)}
                                    disabled={isLoading}
                                    className="flex-1 flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md text-sm transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    <RefreshIcon />
                                    {isLoading ? '...' : 'Regenerate'}
                                </button>
                                 <button
                                    type="button"
                                    onClick={handleStartOver}
                                    disabled={isLoading}
                                    className="flex-1 flex items-center justify-center bg-transparent border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-bold py-2 px-4 rounded-md text-sm transition-all duration-300 disabled:opacity-50"
                                >
                                    <EditIcon />
                                    New Prompt
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Describe what you want to say:</label>
                            <div className="flex gap-2">
                                <input
                                    id="ai-prompt"
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="e.g., ask for freelance availability"
                                    className="flex-grow w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-1 focus:ring-primary focus:outline-none bg-white dark:bg-gray-850 dark:text-white text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleGenerate(false)}
                                    disabled={isLoading || !prompt}
                                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md text-sm transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? '...' : 'Generate'}
                                </button>
                            </div>
                        </>
                    )}
                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default AIAssist;