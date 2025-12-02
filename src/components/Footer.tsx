import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[#020617] pt-10 pb-10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 border-b border-white/5 pb-12">
                    {/* Logo */}
                    <div className="text-2xl font-bold font-display tracking-wider text-white">
                        DS<span className="text-primary">.</span>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6">
                        <a
                            href="https://github.com/DSEENAIAH"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/seenaiahdommalapati/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="mailto:seenaiahdommalapati@gmail.com"
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Seenaiah Dommalapati. All rights reserved.</p>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 hover:text-primary transition-colors group"
                    >
                        Back to Top
                        <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
