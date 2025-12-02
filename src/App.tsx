import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import projectLlm from './assets/project-llm.png';
import projectPlacementFinal from './assets/project-placement.png';
import projectSentiment from './assets/image.png';
import resumePdf from './assets/SEENAIAH-Developer.pdf';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

import Skills from './components/Skills';
import Timeline from './components/Timeline';
import ProjectCard, { Project } from './components/ProjectCard';
import Hero3D from './components/Hero3D';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      const section = element?.closest('section');

      if (section) {
        const id = section.getAttribute('data-section') || section.id;
        if (id && ['home', 'about', 'skills', 'projects', 'contact'].includes(id)) {
          setActiveSection(id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'LLM-Based Admission Assistant',
      description: 'An intelligent admission support system using lightweight LLMs to handle student queries in real-time. Features a dual-intelligence architecture combining TinyLlama 1.1B for complex reasoning and a fast rule-based engine for instant FAQs.',
      image: projectLlm,
      tags: ['GenAI', 'Python', 'FastAPI', 'TinyLlama'],
      github: 'https://github.com/DSEENAIAH/admissions-LLM-chatbot',
      details: {
        features: [
          'Dual Intelligence Architecture (TinyLlama + Rule-based)',
          'Multi-Modal Support (Text, Voice, Documents)',
          'Real-time Analytics & Performance Monitoring',
          'Enterprise-grade Security & Scalability'
        ],
        techStack: ['Python', 'FastAPI', 'TinyLlama 1.1B', 'PyTorch', 'React', 'Docker']
      }
    },
    {
      id: 2,
      title: 'Placement Prep Platform',
      description: 'A full-stack web application for online exams and analytics. Provides real-time dashboards for students and administrators, enabling data-driven insights into placement readiness across multiple colleges.',
      image: projectPlacementFinal,
      tags: ['React', 'AWS', 'Node.js', 'Analytics'],
      github: 'https://github.com/DSEENAIAH/campus-preparation',
      details: {
        features: [
          'Real-time Exam Analytics & Dashboards',
          'Multi-College Support & Role-based Access',
          'Automated Reporting & Performance Tracking',
          'Scalable Cloud Infrastructure on AWS'
        ],
        techStack: ['React', 'Vite', 'AWS Amplify', 'DynamoDB', 'Node.js', 'Tailwind CSS']
      }
    },
    {
      id: 3,
      title: 'Sentiment & Profanity Detection',
      description: 'A robust NLP classifier achieving high accuracy in detecting sentiment and profanity. Deployed as a real-time moderation system for social media content to ensure safe online environments.',
      image: projectSentiment,
      tags: ['NLP', 'Python', 'NLTK', 'ML'],
      github: 'https://github.com/DSEENAIAH',
      details: {
        features: [
          'Real-time Sentiment Analysis (Positive/Negative/Neutral)',
          'Advanced Profanity Filtering & Classification',
          'High Accuracy Model using NLTK & Scikit-learn',
          'REST API for Easy Integration'
        ],
        techStack: ['Python', 'NLTK', 'Scikit-learn', 'Flask', 'Pandas']
      }
    }
  ];

  return (
    <Layout>
      <Navbar activeSection={activeSection} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark-200" />
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
          <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-cyan-500/10 blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col h-full pt-16 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h2 className="text-primary font-medium tracking-widest mb-4 uppercase">AI/ML Engineer & Developer</h2>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                Dommalapati <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                  Seenaiah
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
                Passionate AI/ML Engineer and Full-Stack Developer skilled in building intelligent, data-driven applications.
                Experienced in Python, Generative AI, and LLMs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#projects"
                  className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  View My Work <ArrowRight size={20} />
                </a>
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  Download CV <Download size={20} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block h-full min-h-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-transparent to-transparent z-10 pointer-events-none" />
              <Hero3D />
            </motion.div>
          </div>
        </div>

      </section>



      {/* About Section - Combined Intro & Journey */}
      <section id="about" className="relative bg-[#020617] py-32 container mx-auto px-4 flex items-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-6 items-center w-full relative z-10">
          {/* Left Column: Engineering Intelligence */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
              Engineering <br />
              <span className="text-primary">Intelligence</span>
            </h2>
            <p className="text-slate-400 text-base leading-normal mb-3">
              I am an AI/ML Engineer and Full-Stack Developer adept at transforming data insights into scalable systems.
              My expertise spans Generative AI, Large Language Models (LLMs), and modern web frameworks.
            </p>
            <p className="text-slate-400 text-base leading-normal mb-4">
              Currently pursuing my B.Tech in Computer Science & Engineering at Kalasalingam Academy of Research and Education,
              I have hands-on experience building AI-driven automation systems and predictive analytics modules.
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <h3 className="text-lg font-bold text-white mb-2">Key Achievements</h3>
              <ul className="space-y-1 text-slate-400 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  2nd Prize - Euphoria Hackathon
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-purple" />
                  5th Place - Generative AI Mastermind
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan" />
                  Speaker & Organizer - Int. Conf. on Agri Innovation
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: My Journey */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full" />
              My Journey
            </h3>
            <Timeline events={[
              {
                year: '07/2025 - 09/2025',
                title: 'Developer Intern',
                description: 'Contributed to AI tool behavior analysis and LLM architecture development. Assisted in building AI-driven automation systems.',
                organization: 'Awarcrown Corporation',
              },
              {
                year: '01/2025 - 06/2025',
                title: 'Developer Intern',
                description: 'Worked on integrating web and AI-based features for scalable applications. Developed API endpoints and ML modules for predictive analytics.',
                organization: 'Codenvia Solutions',
              },
              {
                year: '2022 - 2026',
                title: 'B.Tech - CSE',
                description: 'CGPA: 7.5/10.0. Focusing on AI/ML and Data Science.',
                organization: 'Kalasalingam Academy of Research and Education',
              },
              {
                year: '2020 - 2022',
                title: 'Intermediate',
                description: 'Score: 86.3%',
                organization: 'Krishna Chaitanya Junior College',
              },
            ]} />
          </div>
        </div>
      </section>

      {/* Skills Section - Sticky */}
      <section id="skills" className="relative bg-[#020617] py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="w-full relative z-10">
          <Skills />
        </div>
      </section>

      {/* Project Cards - Individual Sticky Sections */}
      {/* Projects Section - Standard Scrolling */}
      <section id="projects" className="relative bg-[#020617] py-32 container mx-auto px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto relative z-10 mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Selected Works</h2>
          <p className="text-slate-400 text-base">
            A showcase of my projects in Generative AI, Machine Learning, and Full Stack Development.
          </p>
        </div>

        <div className="flex flex-col gap-32 items-center">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-full max-w-4xl relative z-10"
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative bg-[#020617] pt-32 pb-0 container mx-auto px-4 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-16 overflow-hidden relative w-full"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">Let's Collaborate</h2>
              <p className="text-slate-400 text-lg mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="space-y-6">
                <a href="mailto:seenaiahdommalapati@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Email</div>
                    <div className="text-white font-medium">seenaiahdommalapati@gmail.com</div>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/seenaiahdommalapati/" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#0077b5] group-hover:border-[#0077b5] transition-all">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">LinkedIn</div>
                    <div className="text-white font-medium">Connect on LinkedIn</div>
                  </div>
                </a>
                <a href="https://github.com/DSEENAIAH" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-black group-hover:border-black transition-all">
                    <Github size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">GitHub</div>
                    <div className="text-white font-medium">Follow on GitHub</div>
                  </div>
                </a>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Name</label>
                  <input type="text" className="w-full bg-dark-200/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Seenaiah" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Email</label>
                  <input type="email" className="w-full bg-dark-200/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="seenaiah@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Message</label>
                <textarea rows={4} className="w-full bg-dark-200/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Tell me about your project..." />
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25">
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <Footer />
    </Layout >
  );
}

export default App;
