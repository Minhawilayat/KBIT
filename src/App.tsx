import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Server, 
  Cpu, 
  Globe, 
  Mail, 
  Phone, 
  Facebook, 
  Youtube, 
  Instagram, 
  ChevronRight, 
  CheckCircle2, 
  Users, 
  Award,
  Menu,
  X,
  ArrowRight,
  Send,
  Loader2,
  Bot,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  Search,
  Download,
  Eye,
  Trash2,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import emailjs from '@emailjs/browser';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const COURSE_DATA = [
  {
    id: 'mcse',
    title: 'MCSE Certification',
    description: 'Master Microsoft Server infrastructure and cloud solutions with our comprehensive MCSE track.',
    icon: <Server className="text-accent" size={32} />,
    tag: 'Infrastructure',
    fullDescription: 'The Microsoft Certified Solutions Expert (MCSE) certification validates that you have the skills needed to run a highly efficient and modern data center, with expertise in identity management, systems management, virtualization, storage, and networking.',
    duration: '6 Months',
    level: 'Advanced',
    fee: 'PKR 25,000',
    modules: [
      'Installing and Configuring Windows Server 2022',
      'Administering Windows Server 2022',
      'Configuring Advanced Windows Server Services',
      'Designing and Implementing a Server Infrastructure',
      'Implementing an Advanced Server Infrastructure'
    ]
  },
  {
    id: 'vmware',
    title: 'VMware vSphere 8',
    description: 'Learn the industry-standard virtualization platform. Install, configure, and manage vSphere 8.',
    icon: <Cpu className="text-accent" size={32} />,
    tag: 'Virtualization',
    fullDescription: 'This course explores installation, configuration, and management of VMware vSphere 8, which consists of VMware ESXi 8.0 and VMware vCenter Server 8.0. This course prepares you to administer a vSphere infrastructure for an organization of any size.',
    duration: '3 Months',
    level: 'Intermediate',
    fee: 'PKR 15,000',
    modules: [
      'Introduction to vSphere and the Software-Defined Data Center',
      'Creating Virtual Machines',
      'vCenter Server Architecture',
      'Configuring and Managing Virtual Networks',
      'Configuring and Managing Virtual Storage'
    ]
  },
  {
    id: 'ccna',
    title: 'Cisco CCNA',
    description: 'Build a strong foundation in networking, security, and automation with Cisco certified training.',
    icon: <Globe className="text-accent" size={32} />,
    tag: 'Networking',
    fullDescription: 'The Cisco Certified Network Associate (CCNA) certification program provides a foundation for a career in networking. It covers a broad range of fundamentals based on the latest technologies, software development skills, and job roles.',
    duration: '4 Months',
    level: 'Beginner to Intermediate',
    fee: 'PKR 12,000',
    modules: [
      'Network Fundamentals',
      'Network Access',
      'IP Connectivity',
      'IP Services',
      'Security Fundamentals',
      'Automation and Programmability'
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    description: 'Protect digital assets and learn ethical hacking, network defense, and security protocols.',
    icon: <CheckCircle2 className="text-accent" size={32} />,
    tag: 'Security',
    fullDescription: 'Our Cyber Security program is designed to provide you with the skills and knowledge necessary to protect computer systems, networks, and data from digital attacks. You will learn about ethical hacking, risk management, and incident response.',
    duration: '5 Months',
    level: 'Intermediate to Advanced',
    fee: 'PKR 20,000',
    modules: [
      'Introduction to Cybersecurity',
      'Network Security and Defense',
      'Ethical Hacking and Penetration Testing',
      'Digital Forensics and Incident Response',
      'Cloud Security and Compliance'
    ]
  }
];

// Utility for smooth scrolling with offset
const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Courses', href: '/#courses' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.substring(2);
      if (isHome) {
        scrollToId(id);
      }
    } else if (href === '/' && isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled || !isHome ? 'bg-white/90 backdrop-blur-xl border-b border-primary/5 py-3 md:py-4' : 'bg-transparent py-6 md:py-10'}`}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 md:gap-4 group">
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary flex items-center justify-center text-white font-black text-xl md:text-2xl transition-transform group-hover:rotate-[135deg]">KB</div>
            <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-accent animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black uppercase tracking-[-0.05em] text-primary leading-none">KBIT</span>
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-accent leading-none mt-1">Academy</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-16">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              onClick={() => handleLinkClick(link.href)}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 hover:text-primary transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link to="/enroll" className="relative group overflow-hidden bg-primary px-10 py-4 text-white text-[10px] font-black uppercase tracking-[0.3em]">
            <span className="relative z-10">Enroll Now</span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden w-10 h-10 flex items-center justify-center border border-primary/10 rounded-lg" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] p-8 flex flex-col justify-center items-center gap-8 md:hidden"
          >
            <button className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center border border-primary/10 rounded-full" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  to={link.href} 
                  className="text-4xl font-black uppercase tracking-tighter text-primary hover:text-accent transition-colors"
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <Link to="/enroll" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full max-w-xs text-center py-5 text-lg mt-8">Get Started</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-slate-50 rounded-bl-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-6">
            <Award size={14} />
            Global Certification Standards
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 text-primary">
            Empowering the <span className="text-accent">Next Generation</span> of IT Professionals.
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            KBIT Academy blends hands-on learning with global certification standards to prepare you for the evolving digital landscape.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/#courses" 
              onClick={() => scrollToId('courses')}
              className="btn-primary flex items-center gap-2"
            >
              Explore Courses <ArrowRight size={18} />
            </Link>
            <Link 
              to="/#about" 
              onClick={() => scrollToId('about')}
              className="btn-secondary"
            >
              Learn More
            </Link>
          </div>
          
          <button 
            onClick={() => scrollToId('about')}
            className="mt-12 flex items-center gap-8 group cursor-pointer text-left"
          >
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
              ].map((url, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden transition-transform group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }}>
                  <img src={url} alt="student" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-primary">500+ Students</p>
              <p className="text-xs text-slate-500">Already certified & working</p>
            </div>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/it-training/800/600" 
              alt="IT Training" 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 glass-card p-4 rounded-2xl shadow-2xl hidden md:block z-20 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-sm">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-primary">Hands-on Labs</p>
                <p className="text-[10px] text-slate-500">Real-world scenarios</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Courses Offered', value: '25+', id: 'courses' },
    { label: 'Certified Students', value: '1,200+', id: 'about' },
    { label: 'Expert Trainers', value: '15+', id: 'about' },
    { label: 'Success Rate', value: '98%', id: 'about' },
  ];

  return (
    <section className="py-12 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <motion.button 
            key={stat.label}
            onClick={() => scrollToId(stat.id)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="text-center hover:scale-105 transition-transform cursor-pointer"
          >
            <p className="text-4xl font-bold mb-1">{stat.value}</p>
            <p className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

const Courses = () => {
  return (
    <section id="courses" className="py-32 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
              <BookOpen size={14} />
              Our Curriculum
            </div>
            <h2 className="text-5xl font-black text-primary mb-6 tracking-tight leading-[1.1]">
              Elevate Your Career with <br />
              <span className="text-accent">Industry-Leading</span> Courses
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              We provide world-class technical training designed by experts to help you master the most in-demand skills in the IT industry.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <Link to="/enroll" className="btn-primary px-8 py-4 rounded-2xl flex items-center gap-3 group">
              Start Your Journey
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSE_DATA.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <Link to={`/course/${course.id}`} className="block h-full">
                <div className="h-full bg-slate-50 border border-slate-100 rounded-[32px] p-8 transition-all duration-500 hover:bg-white hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:border-transparent group-hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    {course.icon}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-100">
                        {course.tag}
                      </span>
                      <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                        {course.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                    
                    <div className="pt-4 flex items-center justify-between">
                      <span className="text-lg font-black text-primary">{course.fee}</span>
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 p-8 rounded-[40px] bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <Phone size={32} className="text-accent" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Confused About Which Course to Pick?</h4>
              <p className="text-slate-400">If you're unsure which path is right for you, our experts will guide you to the best choice.</p>
            </div>
          </div>
          <a href="https://wa.me/923469307175" target="_blank" rel="noopener noreferrer" className="btn-accent px-8 py-4 rounded-2xl whitespace-nowrap flex items-center gap-2">
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="https://picsum.photos/seed/lab1/400/500" alt="Lab" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
              <div className="bg-accent p-6 rounded-2xl text-white">
                <Users size={32} className="mb-4" />
                <p className="text-2xl font-bold">15+</p>
                <p className="text-xs opacity-80 uppercase tracking-widest">Expert Mentors</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-primary p-6 rounded-2xl text-white">
                <Award size={32} className="mb-4" />
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs opacity-80 uppercase tracking-widest">Global Standards</p>
              </div>
              <img src="https://picsum.photos/seed/lab2/400/500" alt="Lab" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2"
        >
          <h2 className="text-4xl font-bold text-primary mb-6">Why Choose KBIT?</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            KBIT Academy is dedicated to bridging the gap between academic knowledge and industry requirements. Our initiative focuses on local talent development with international standards.
          </p>
          
          <ul className="space-y-4 mb-10">
            {[
              'Hands-on practical training in modern labs',
              'Curriculum aligned with global certifications',
              'Flexible schedules for working professionals',
              'Job placement assistance & career counseling'
            ].map((item, index) => (
              <motion.li 
                key={item} 
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-slate-700 font-medium">{item}</span>
              </motion.li>
            ))}
          </ul>
          
          <Link 
            to="/#contact" 
            onClick={() => scrollToId('contact')}
            className="btn-primary inline-block"
          >
            Learn More About Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}; 

const Aboutkb = () => {
  return (
    <section id="about" className="py-32 bg-slate-50">
      <div className="max-w-[1800px] mx-auto px-12">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-accent mb-4 block">
              About KBIT & Kashif Ali
            </span>
            <h2 className="text-4xl lg:text-6xl font-extrabold text-primary tracking-tight mb-8 leading-snug">
              Leading the <span className="text-accent">IT Revolution</span> in Pakistan.
            </h2>
            <div className="space-y-6 text-base text-slate-600 leading-relaxed max-w-xl">
              <p>
                <strong>KBIT Academy</strong>, founded by <strong>Kashif Ali</strong>, is a premier IT training institute dedicated to bridging the gap between academic learning and industry requirements.
              </p>
              <p>
                Kashif Ali is a renowned IT expert with years of experience in networking and server management.
              </p>
              <p>
                Our mission is to transform raw talent into world-class IT engineers.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="p-6 glass-card rounded-[25px]">
                <p className="text-3xl font-bold text-primary mb-2">100%</p>
                <p className="text-xs uppercase tracking-widest text-slate-500">Practical Training</p>
              </div>
              <div className="p-6 glass-card rounded-[25px]">
                <p className="text-3xl font-bold text-primary mb-2">Global</p>
                <p className="text-xs uppercase tracking-widest text-slate-500">Certifications</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="rounded-[30px] overflow-hidden shadow-xl w-[60%]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                alt="Kashif Ali"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute bottom-4 left-4 glass-card-dark p-6 border border-gray-300 rounded-[25px] shadow-lg max-w-xs hidden md:block">
              <p className="text-dark text-sm italic mb-3">
                "We transform raw talent into world-class IT engineers."
              </p>
              <p className="text-accent font-semibold uppercase text-[10px] tracking-widest">
                Kashif Ali - Director KBIT
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Demo = () => {
  return (
    <section id="demo" className="py-10 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>
      <div className="max-w-[1800px] mx-auto px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold uppercase tracking-[0.4em] text-accent mb-6 block">Experience KBIT</span>
            <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
              Watch Our <span className="text-accent">Training</span> Demo.
            </h2>
            <p className="text-xl text-white/60 mb-12 leading-relaxed max-w-xl">
              Get a glimpse of our practical training methodology. See how we bridge the gap between theory and real-world implementation with hands-on labs and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="https://youtube.com/@KBITAcademy" target="_blank" rel="noopener noreferrer" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">Visit YouTube Channel</a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video bg-black rounded-[40px] overflow-hidden shadow-2xl border border-white/10"
          >
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/PAKbE0V2jho" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/923469307175"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl"
    >
      <Phone size={28} />
    </motion.a>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'Course Inquiry',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // 1. Sync to Google Sheets (Backend)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to sync with database');

      // 2. Send Email via EmailJS (Client-side)
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.fullName,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'query@kbit.com.pk', // Admin email
          },
          publicKey
        );
      } else {
        console.warn("EmailJS credentials missing. Email not sent.");
      }

      setStatus('success');
      setFormData({ fullName: '', email: '', subject: 'Course Inquiry', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.0 }}
          className="bg-white rounded-[40px] shadow-xl overflow-hidden grid lg:grid-cols-5"
        >
          <div className="lg:col-span-2 bg-primary p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-slate-400 mb-12">Have questions about our courses or certifications? Our team is here to help you.</p>
            <div className="space-y-8">
              {[
                { icon: <Mail size={20} />, label: 'Email Us', value: 'query@kbit.com.pk' },
                { icon: <Phone size={20} />, label: 'Call Us', value: '+92 346 9307175' },
                { icon: <Globe size={20} />, label: 'Location', value: 'Buner, KP, Pakistan' }
              ].map((item, index) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className="font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"> 
                  <label className="text-sm font-bold text-primary">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent transition-colors" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent transition-colors" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Message</label>
                <textarea 
                  required
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent transition-colors" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                disabled={status === 'loading'}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Send Message'}
              </button>
              {status === 'success' && (
                <p className="text-green-600 text-sm font-medium text-center">Message sent successfully!</p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
           <Link to="/" className="flex items-center gap-4 group">
              <div className="w-16 h-16 bg-accent flex items-center justify-center text-white font-black text-3xl transition-transform group-hover:rotate-[135deg]">KB</div>
              <div className="flex flex-col">
                <span className="text-3xl font-black uppercase tracking-[-0.05em] text-white leading-none">KBIT</span>
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-accent leading-none mt-2">Academy</span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Empowering the next generation of IT professionals with hands-on learning and global certification standards.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/#courses" onClick={() => scrollToId('courses')} className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/#about" onClick={() => scrollToId('about')} className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/#contact" onClick={() => scrollToId('contact')} className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Top Courses</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/course/mcse" className="hover:text-white transition-colors">MCSE Training</Link></li>
              <li><Link to="/course/vmware" className="hover:text-white transition-colors">VMware vSphere 8</Link></li>
              <li><Link to="/course/ccna" className="hover:text-white transition-colors">Cisco CCNA</Link></li>
              <li><Link to="/course/cyber-security" className="hover:text-white transition-colors">Cyber Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Stay Connected</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Youtube size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Instagram size={18} /></a>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/10 text-center">
          <p className="text-slate-500 text-sm">
            Copyright © 2025 | KBIT Academy | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = COURSE_DATA.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!course) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4">Course not found</h2>
      <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <Link 
          to="/#courses"
          className="flex items-center gap-2 text-slate-500 hover:text-accent mb-8 transition-colors"
        >
          <ChevronLeft size={20} /> Back to Courses
        </Link>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-6">
              {course.tag}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">{course.title}</h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">{course.fullDescription}</p>
            <h3 className="text-2xl font-bold text-primary mb-6">Course Modules</h3>
            <div className="space-y-4">
              {course.modules.map((module, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <span className="font-medium text-slate-700">{module}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="glass-card p-8 rounded-[32px] sticky top-32">
              <h3 className="text-xl font-bold text-primary mb-6">Course Overview</h3>
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-accent">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Duration</p>
                    <p className="font-bold text-primary">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-accent">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Level</p>
                    <p className="font-bold text-primary">{course.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-accent">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Course Fee</p>
                    <p className="font-bold text-primary">{(course as any).fee}</p>
                  </div>
                </div>
              </div>
              <Link to="/enroll" className="btn-primary w-full block text-center mb-4">Enroll Now</Link>
              <p className="text-center text-xs text-slate-500">Limited seats available for the next batch.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EnrollmentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: 'MCSE Certification',
    phone: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: formData.name,
          studentEmail: formData.email,
          courseTitle: formData.course,
          phone: formData.phone
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to enroll');
      }
      
      setStatus('success');
    } catch (error: any) {
      console.error("Enrollment error:", error);
      setErrorMessage(error.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center glass-card p-12 rounded-[40px]">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Enrollment Received!</h2>
          <p className="text-slate-600 mb-8">Thank you for choosing KBIT Academy. Your data has been synced to our Google Sheet.</p>
          <Link to="/" className="btn-primary inline-block">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen pt-32 pb-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">Start Your IT Career</h1>
          <p className="text-slate-600">Fill out the form below to begin your journey with KBIT Academy.</p>
        </div>
        <div className="glass-card p-8 lg:p-12 rounded-[40px]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent transition-colors" 
                  placeholder="+92 3XX XXXXXXX" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Select Course</label>
                <select 
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent transition-colors"
                >
                  {COURSE_DATA.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <button 
              disabled={status === 'loading'}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Submit Enrollment'}
            </button>
            {status === 'error' && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center">
                <p className="text-red-600 text-sm font-bold mb-1">Submission Failed</p>
                <p className="text-red-500 text-xs">{errorMessage || 'Please check your Google Sheets configuration.'}</p>
                <p className="text-[10px] text-red-400 mt-2">Make sure GOOGLE_SCRIPT_URL is set in Secrets.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check for demo purposes
    // In a real app, this should be handled by a secure auth system
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin password');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-6 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-12 rounded-[40px]"
      >
        <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock size={32} />
        </div>
        <h2 className="text-3xl font-bold text-primary text-center mb-2">Admin Login</h2>
        <p className="text-slate-500 text-center mb-8">Enter your credentials to access the dashboard</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-primary">Admin Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent transition-colors" 
              placeholder="••••••••" 
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button className="btn-primary w-full py-4">Login to Dashboard</button>
        </form>
      </motion.div>
    </div>
  );
};

const AdminDashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/sheet-data');
        const result = await response.json();
        if (result.data) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
            <p className="text-slate-500">Manage student enrollments and inquiries</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-500 hover:text-red-500 font-bold transition-colors"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          <div className="glass-card p-8 rounded-3xl">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Total Enrollments</p>
            <p className="text-4xl font-bold text-primary">{data.length}</p>
          </div>
          <div className="glass-card p-8 rounded-3xl">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Active Courses</p>
            <p className="text-4xl font-bold text-accent">4</p>
          </div>
          <div className="glass-card p-8 rounded-3xl">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">New Today</p>
            <p className="text-4xl font-bold text-green-500">2</p>
          </div>
          <div className="glass-card p-8 rounded-3xl">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Pending Review</p>
            <p className="text-4xl font-bold text-orange-500">5</p>
          </div>
        </div>

        <div className="glass-card rounded-[40px] overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h3 className="text-xl font-bold text-primary">Student Records</h3>
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name, email or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest">
                  <th className="px-8 py-4 font-bold">Student</th>
                  <th className="px-8 py-4 font-bold">Course</th>
                  <th className="px-8 py-4 font-bold">Phone</th>
                  <th className="px-8 py-4 font-bold">Date</th>
                  <th className="px-8 py-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center">
                      <Loader2 className="animate-spin mx-auto text-accent" size={32} />
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((student, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-primary">{student.name}</p>
                            <p className="text-xs text-slate-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest">
                          {student.course}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-600">{student.phone}</td>
                      <td className="px-8 py-6 text-sm text-slate-600">
                        {new Date(student.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <button className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-slate-400">
                      No records found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Courses />
      <About />
      <Aboutkb />
      <Demo />
      <WhatsAppButton/>
      <Contact />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/enroll" element={<EnrollmentPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
