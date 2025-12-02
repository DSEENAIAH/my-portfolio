

const technologies = [
    { name: 'Python', color: 'text-yellow-400' },
    { name: 'Generative AI', color: 'text-purple-400' },
    { name: 'LLMs', color: 'text-blue-400' },
    { name: 'LangChain', color: 'text-green-400' },
    { name: 'Hugging Face', color: 'text-yellow-500' },
    { name: 'TensorFlow', color: 'text-orange-500' },
    { name: 'Scikit-learn', color: 'text-blue-300' },
    { name: 'JavaScript', color: 'text-yellow-300' },
    { name: 'React', color: 'text-cyan-400' },
    { name: 'Flask', color: 'text-white' },
    { name: 'SQL', color: 'text-blue-500' },
    { name: 'Git', color: 'text-red-500' },
];

const TechStack = () => {
    return (
        <div className="w-full py-10">
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-6xl mx-auto px-4">
                {technologies.map((tech, index) => (
                    <div
                        key={index}
                        className={`text-2xl md:text-3xl font-bold ${tech.color} hover:scale-110 transition-transform cursor-default`}
                    >
                        {tech.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechStack;
