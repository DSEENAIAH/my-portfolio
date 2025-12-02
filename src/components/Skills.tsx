import { motion } from 'framer-motion';

const skillCategories = [
    {
        title: 'Generative AI & LLMs',
        skills: ['Large Language Models', 'LangChain', 'Hugging Face', 'Prompt Engineering', 'RAG Pipelines'],
        color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
        title: 'Data Science & ML',
        skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Computer Vision', 'NLP'],
        color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
        title: 'Web Development',
        skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Flask', 'REST APIs', 'Responsive Design'],
        color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
    },
    {
        title: 'Tools & Platforms',
        skills: ['Git & GitHub', 'Jupyter Notebook', 'Google Colab', 'SQL', 'VS Code'],
        color: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    }
];

const Skills = () => {
    return (
        <section className="py-10 container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Technical Expertise</h2>
                <p className="text-slate-400 text-base">
                    A comprehensive toolkit enabling me to build end-to-end AI solutions and scalable web applications.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group"
                    >
                        <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">
                            {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${category.color}`}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
