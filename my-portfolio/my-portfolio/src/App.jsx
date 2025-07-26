import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
// import { Button } from '@/components/ui/button.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Award,
  Calendar,
  Code,
  Brain,
  Database,
  Globe,
  Menu,
  X,
  Sparkles,
  Zap,
  Target
} from 'lucide-react'
import seenaiahImage from './assets/portfolio.png'



function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Typing animation for hero section
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const roles = [
    'AI/ML Engineer',
    'Full-Stack Developer'
  ]

  useEffect(() => {
    let ticking = false;
    
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY })
          ticking = false;
        });
        ticking = true;
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const currentRole = roles[currentIndex]
    if (displayText.length < currentRole.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setDisplayText('')
        setCurrentIndex((prev) => (prev + 1) % roles.length)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [displayText, currentIndex])

  const skills = {
    'Programming Languages': [
      { name: 'Python', level: 95 },
      { name: 'JavaScript', level: 88 },
      { name: 'HTML5/CSS3', level: 92 }
    ],
    'AI/ML Technologies': [
      { name: 'TensorFlow', level: 85 },
      { name: 'scikit-learn', level: 90 },
      { name: 'NLP/NLTK', level: 88 },
      { name: 'Computer Vision', level: 82 }
    ],
    'Web Development': [
      { name: 'Flask', level: 88 },
      { name: 'RESTful APIs', level: 90 }
    ]
  }

  const projects = [
    {
      title: 'AI-Powered Sentiment & Profanity Detection',
      description: 'Advanced NLP algorithm achieving 92% accuracy in toxic content detection using Python and NLTK with scalable architecture for social media integration.',
      tech: ['Python', 'NLTK', 'NLP', 'Machine Learning'],
      accuracy: '92%',
      icon: <Brain className="w-6 h-6" />,
      gradient: 'from-blue-500 via-purple-500 to-pink-500'
    },
    {
      title: 'Heart Disease Risk Prediction Model',
      description: 'ML model with 87% accuracy using scikit-learn for healthcare risk assessment with interactive dashboard for healthcare professionals.',
      tech: ['Python', 'scikit-learn', 'Healthcare AI', 'Dashboard'],
      accuracy: '87%',
      icon: <Database className="w-6 h-6" />,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500'
    },
    {
      title: 'Computer Vision Waste Classification',
      description: 'CNN model trained on 5,000+ images achieving 90%+ accuracy using TensorFlow with web interface for instant waste classification.',
      tech: ['TensorFlow', 'CNN', 'Computer Vision', 'Web Interface'],
      accuracy: '90%+',
      icon: <Globe className="w-6 h-6" />,
      gradient: 'from-orange-500 via-red-500 to-pink-500'
    },
    {
      title: 'Worker Booking System',
      description: 'Flask web application with dynamic scheduling, real-time availability, and automated conflict resolution system.',
      tech: ['Flask', 'Python', 'Web Development', 'Real-time'],
      accuracy: 'Production Ready',
      icon: <Code className="w-6 h-6" />,
      gradient: 'from-violet-500 via-purple-500 to-indigo-500'
    }
  ]

  const achievements = [
    {
      title: 'TechNOVUS 2.4 Hackathon Winner',
      description: 'Best Prototype Award',
      icon: <Award className="w-5 h-5" />,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'AI-driven Sustainability Research Speaker',
      description: 'INNOVATE Euphoria Conference',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: 'International Conference Participant',
      description: 'Agriculture Innovation',
      icon: <Target className="w-5 h-5" />,
      color: 'from-blue-400 to-cyan-500'
    }
  ]

  const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Achievements', 'Contact']

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId.toLowerCase())
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden relative">
      {/* Animated Background Elements */}
      <motion.div
        className="fixed inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, -50, window.innerHeight + 50],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Optimized Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.1
        }}
      />
      <motion.div
        className="fixed w-12 h-12 border-2 border-purple-400/30 rounded-full pointer-events-none z-50"
        style={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.15
        }}
      />

      {/* Enhanced Navigation */}
      <motion.nav 
        className="fixed top-0 w-full bg-black/30 backdrop-blur-xl z-40 border-b border-gradient-to-r from-purple-500/20 to-cyan-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
         <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            style={{ filter: "drop-shadow(0 0 0 rgba(0, 0, 0, 0))" }} // <- Initial value
          whileHover={{ 
            scale: 1.05,
            filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))"
          }}
            transition={{ duration: 0.3 }}
>
            Seenaiah
          </motion.div>

            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-white/80 hover:text-white transition-all duration-300 relative group"
                  whileHover={{ 
                    scale: 1.05,
                    color: "#a855f7"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                      layoutId="activeSection"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left text-white/80 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
        {/* Advanced Animated Background */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `linear-gradient(45deg, 
                  hsl(${Math.random() * 60 + 200}, 70%, 60%), 
                  hsl(${Math.random() * 60 + 280}, 70%, 60%))`
              }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, -100, window.innerHeight + 100],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div 
                className="w-20 h-20 border border-purple-400/20 backdrop-blur-sm"
                style={{
                  borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                  background: `linear-gradient(45deg, 
                    rgba(168, 85, 247, 0.1), 
                    rgba(59, 130, 246, 0.1))`
                }}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
            whileHover={{
              scale: 1.02,
              filter: "drop-shadow(0 0 30px rgba(168, 85, 247, 0.3))"
            }}
          >
            Seenaiah Dommalapati
          </motion.h1>
          
          <motion.div
            className="text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <span className="text-white/80">I'm a </span>
            <span className="ml-2 text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold min-w-[300px] text-left">
              {displayText}
              <motion.span
                className="inline-block w-0.5 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </motion.div>

          <motion.p
            className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            Final year Computer Science student specializing in AI/ML with expertise in developing 
            high-accuracy predictive models and full-stack applications. Passionate about creating 
            intelligent solutions that make a real-world impact.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                View My Work
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline" 
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 text-lg backdrop-blur-sm bg-white/5 transition-all duration-300"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div 
                  className="w-80 h-80 mx-auto bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full p-1"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 5,
                    filter: "drop-shadow(0 20px 40px rgba(168, 85, 247, 0.3))"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={seenaiahImage} 
                      alt="Seenaiah Dommalapati" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full backdrop-blur-sm"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity }
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full backdrop-blur-sm"
                  animate={{ 
                    rotate: -360,
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    y: { duration: 3, repeat: Infinity }
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.p 
                className="text-lg text-white/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                I'm a passionate final year Computer Science Engineering student at Kalasalingam Academy 
                of Research and Education with a strong foundation in Artificial Intelligence and Machine Learning. 
                My journey in tech has been driven by curiosity and the desire to solve real-world problems 
                through innovative solutions.
              </motion.p>
              
              <motion.p 
                className="text-lg text-white/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                viewport={{ once: true }}
              >
                With expertise in AI Tool Behavior Analysis and deep understanding of LLM architectures, 
                I specialize in creating intelligent systems that think and act autonomously. My projects 
                consistently achieve high accuracy rates (87-92%), demonstrating my commitment to excellence 
                and attention to detail.
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="text-center p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-lg backdrop-blur-sm border border-white/10"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderColor: "rgba(168, 85, 247, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">7.5/10</div>
                  <div className="text-sm text-white/70">CGPA</div>
                </motion.div>
                <motion.div 
                  className="text-center p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-lg backdrop-blur-sm border border-white/10"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderColor: "rgba(168, 85, 247, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">92%</div>
                  <div className="text-sm text-white/70">Best Project Accuracy</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Experience Section */}
      <section id="experience" className="py-20 px-4 bg-gradient-to-b from-black/20 via-purple-900/10 to-black/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Experience & Education
          </motion.h2>

          <div className="relative">
            {/* Enhanced Timeline Line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            />

            <div className="space-y-12">
              {/* Education */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-1/2 pr-8 text-right">
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-gradient-to-br from-white/10 to-white/5 border-purple-400/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                          Bachelor of Technology - CSE
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          Kalasalingam Academy of Research and Education
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white/80">CGPA: 7.5/10.0 | 2022 - 2026</p>
                        <p className="text-sm text-white/60 mt-2">
                          Specializing in AI/ML with focus on intelligent systems and autonomous agents
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
                <motion.div 
                  className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full relative z-10"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="w-1/2 pl-8"></div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-1/2 pr-8"></div>
                <motion.div 
                  className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full relative z-10"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="w-1/2 pl-8">
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-gradient-to-br from-white/10 to-white/5 border-pink-400/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Key Certifications
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          Professional Development
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-white/80">
                          <li>• Complete AI & ML Data Science Bootcamp - Udemy</li>
                          <li>• Design and Analysis of Algorithms - CodeChef</li>
                          <li>• Soft Skills & Development - NPTEL</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="bg-gradient-to-br from-white/10 to-white/5 border-purple-400/30 backdrop-blur-sm h-full hover:border-purple-400/50 transition-all duration-500 group overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                      <motion.div 
                        className="text-purple-400 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {project.icon}
                      </motion.div>
                      <Badge 
                        variant="secondary" 
                        className={`bg-gradient-to-r ${project.gradient} text-white border-0`}
                      >
                        {project.accuracy}
                      </Badge>
                    </div>
                    <CardTitle className="text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-white/80 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge 
                            variant="outline" 
                            className="border-purple-400/30 text-purple-400 hover:bg-purple-400/20 transition-colors duration-300"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gradient-to-b from-black/20 via-purple-900/10 to-black/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-gradient-to-br from-white/10 to-white/5 border-purple-400/30 backdrop-blur-sm h-full hover:border-purple-400/50 transition-all duration-500 group">
                  <CardHeader>
                    <CardTitle className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skillList.map((skill, skillIndex) => (
                      <motion.div 
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIndex * 0.1 + categoryIndex * 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-white/80">{skill.name}</span>
                          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="relative">
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ 
                                duration: 1.5, 
                                delay: skillIndex * 0.1 + categoryIndex * 0.3,
                                ease: "easeOut"
                              }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Achievements Section */}
      <section id="achievements" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Achievements & Recognition
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="bg-gradient-to-br from-white/10 to-white/5 border-purple-400/30 backdrop-blur-sm text-center hover:border-purple-400/50 transition-all duration-500 group h-full">
                  <CardContent className="pt-6">
                    <motion.div 
                      className={`bg-gradient-to-r ${achievement.color} p-3 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-white">
                        {achievement.icon}
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {achievement.title}
                    </h3>
                    <p className="text-white/70">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-black/20 via-purple-900/10 to-black/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Let's Connect
          </motion.h2>

          <motion.p
            className="text-xl text-white/70 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and innovation.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Mail, title: 'Email', info: 'seenaiahdommalapati@gmail.com', gradient: 'from-blue-400 to-cyan-400' },
              { icon: Phone, title: 'Phone', info: '+91 79813 60951', gradient: 'from-purple-400 to-pink-400' },
              { icon: MapPin, title: 'Location', info: 'Nellore, Andhra Pradesh', gradient: 'from-green-400 to-emerald-400' }
            ].map((contact, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -5,
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-white/10 to-white/5 border-purple-400/30 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-500 group">
                  <CardContent className="pt-6 text-center">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-r ${contact.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <contact.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="font-semibold text-white mb-2">{contact.title}</h3>
                    <p className="text-white/70 text-sm">{contact.info}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Linkedin, href: 'https://linkedin.com/in/seenaiah-dommalapati-23b86b268', gradient: 'from-blue-500 to-blue-600' },
              { icon: Github, href: 'https://github.com/DSEENAIAH', gradient: 'from-gray-700 to-gray-800' },
              { icon: Mail, href: 'mailto:seenaiahdommalapati@gmail.com', gradient: 'from-red-500 to-red-600' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 bg-gradient-to-r ${social.gradient} rounded-full hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 360
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <social.icon className="w-6 h-6 text-white" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-8 px-4 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p 
            className="text-white/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            © 2024 Seenaiah Dommalapati. Crafted with passion and precision.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}

export default App

