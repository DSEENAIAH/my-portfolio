import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Layers, Code, Cpu } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    github: string;
    demo?: string;
    details?: {
        features: string[];
        techStack: string[];
        architecture?: string;
    };
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-4 md:inset-auto md:top-[5%] md:left-[10%] md:right-[10%] md:bottom-[5%] z-50 overflow-y-auto"
                    >
                        <div className="bg-[#0f172a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto relative">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white/70 hover:text-white transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            {/* Image Header */}
                            <div className="relative h-64 md:h-80 w-full">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent z-0" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute bottom-0 left-0 p-8 z-10">
                                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
                                        {project.title}
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, idx) => (
                                            <span key={idx} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 grid md:grid-cols-3 gap-8">
                                {/* Main Info */}
                                <div className="md:col-span-2 space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <Layers className="text-primary" size={24} />
                                            Overview
                                        </h3>
                                        <p className="text-slate-300 leading-relaxed text-lg">
                                            {project.description}
                                        </p>
                                    </div>

                                    {project.details?.features && (
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                <Cpu className="text-accent-purple" size={24} />
                                                Key Features
                                            </h3>
                                            <ul className="grid gap-3">
                                                {project.details.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-8">
                                    {/* Links */}
                                    <div className="flex flex-col gap-3">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all group"
                                        >
                                            <Github size={20} />
                                            View Source
                                            <ExternalLink size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </div>

                                    {/* Tech Stack */}
                                    {project.details?.techStack && (
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                                <Code className="text-accent-cyan" size={20} />
                                                Tech Stack
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.details.techStack.map((tech, idx) => (
                                                    <span key={idx} className="px-2 py-1 rounded-md bg-black/20 text-slate-300 text-sm border border-white/5">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
