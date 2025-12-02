import React from 'react';
import { motion } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  organization: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative pl-8 border-l border-white/10 space-y-8">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Node */}
          <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-dark border-4 border-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

          {/* Content */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-1">
            <span className="text-primary font-bold font-display text-base">{event.year}</span>
            <h4 className="text-lg font-bold text-white">{event.title}</h4>
          </div>

          <div className="text-slate-400 font-medium mb-1">{event.organization}</div>
          <p className="text-slate-500 leading-snug max-w-2xl text-sm">
            {event.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;