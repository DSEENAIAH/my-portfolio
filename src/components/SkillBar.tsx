import React, { useEffect, useState } from 'react';

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, color, delay }) => {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const skillRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(level);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, level, delay]);

  return (
    <div ref={skillRef} className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-xl hover:shadow-purple-500/20">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-white">{name}</h3>
        <span className="text-gray-400">{level}%</span>
      </div>
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;