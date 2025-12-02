import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';

export interface Project {
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

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative rounded-3xl overflow-hidden bg-dark-200/50 border border-white/5 hover:border-primary/30 transition-colors duration-500 h-full flex flex-col"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-200 to-transparent z-10 opacity-60" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
        />

        {/* Floating Action Button */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
          {project.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={18} />
            </a>
          </div>
          <span className="text-sm text-primary font-medium cursor-pointer">
            View Details
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;