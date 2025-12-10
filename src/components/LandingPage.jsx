import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 text-text-main selection:bg-primary/30 transition-colors duration-500">

            {/* Theme Toggle Top Right */}
            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle />
            </div>

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl text-center space-y-8"
            >
                {/* Logo Icon */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        className="bg-surface/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                    >
                        <Leaf className="w-16 h-16 text-primary drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    </motion.div>
                </div>

                {/* Hero Text */}
                <div className="relative">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-text-main to-text-muted">
                        Carbon<span className="text-primary text-glow">Cut</span>
                    </h1>
                </div>

                <p className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto leading-relaxed font-light">
                    Transform your daily impact into actionable data.
                    <br />
                    <span className="text-text-main font-semibold">Measure</span>, <span className="text-text-main font-semibold">Reduce</span>, and <span className="text-text-main font-semibold">Evolve</span> towards a sustainable future.
                </p>

                {/* Action Button */}
                <div className="pt-8">
                    <motion.button
                        onClick={() => navigate('/dashboard')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-200 bg-primary/90 rounded-full hover:bg-primary hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] overflow-hidden shadow-lg"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Start Your Journey
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    </motion.button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
                    {[
                        { icon: Globe, title: "Global Impact", desc: "See exactly how your lifestyle contributes to global emissions." },
                        { icon: Zap, title: "Smart Analysis", desc: "Granular data processing for transport and energy usage." },
                        { icon: Leaf, title: "Eco-Gamification", desc: "Earn badges and level up by reducing your footprint." }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (idx * 0.1) }}
                            className="glass-card p-6"
                        >
                            <feature.icon className="w-8 h-8 text-primary mb-4" />
                            <h3 className="font-bold text-lg text-text-main mb-2">{feature.title}</h3>
                            <p className="text-sm text-text-muted">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <footer className="absolute bottom-6 text-text-muted/40 text-xs font-medium tracking-widest uppercase">
                Designed for the Planet
            </footer>
        </div>
    );
};

export default LandingPage;
