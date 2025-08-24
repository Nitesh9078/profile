import React, { useState } from 'react';

const faqs = [
    {
        question: "What technologies do you specialize in?",
        answer: "I specialize in the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. I'm also proficient in UI/UX design principles, modern CSS frameworks like Tailwind CSS, and tools like Figma."
    },
    {
        question: "Are you available for freelance projects?",
        answer: "Yes, I am currently open to freelance opportunities. If you have a project in mind, feel free to reach out through the contact form, and we can discuss the details."
    },
    {
        question: "How do you approach a new project?",
        answer: "My approach begins with a thorough understanding of the project's goals and target audience. I then move to wireframing and prototyping, followed by development, testing, and deployment. I believe in agile methodologies and clear communication throughout the process."
    },
    {
        question: "What are your hobbies outside of coding?",
        answer: "When I'm not at my computer, I enjoy hiking, photography, and exploring new coffee shops. I find that disconnecting and spending time in nature helps me stay creative and focused."
    }
];

const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            <h2 className="text-4xl font-bold text-left mb-16 text-dark dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white dark:bg-medium rounded-lg shadow-md overflow-hidden transition-all duration-300">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none"
                            aria-expanded={activeIndex === index}
                        >
                            <span className="font-semibold text-lg text-dark dark:text-white">{faq.question}</span>
                            <svg
                                className={`w-6 h-6 text-primary transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div 
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
                        >
                            <div className="p-6 pt-0">
                                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;