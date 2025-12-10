import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Leaf, Globe, Zap, BarChart3, Shield, Users, TrendingDown, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const features = [
        {
            icon: <Globe className="w-7 h-7" />,
            title: "Global Impact",
            desc: "See how your local actions contribute to global sustainability goals.",
            color: "emerald"
        },
        {
            icon: <Zap className="w-7 h-7" />,
            title: "Real-time Insights",
            desc: "Get instant AI-powered feedback on your carbon footprint.",
            color: "amber"
        },
        {
            icon: <BarChart3 className="w-7 h-7" />,
            title: "Smart Analytics",
            desc: "Visualize your progress with beautiful charts and personalized tips.",
            color: "teal"
        }
    ];

    const stats = [
        { value: "10K+", label: "Active Users" },
        { value: "50K", label: "Tons CO₂ Saved" },
        { value: "95%", label: "User Satisfaction" }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />
            </div>

            {/* Navigation */}
            <nav className="relative z-20 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-500/30">
                            <Leaf className="w-6 h-6 text-emerald-400" />
                        </div>
                        <span className="text-2xl font-bold text-white">Carbon<span className="text-emerald-400">Cut</span></span>
                    </div>

                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="btn-primary"
                            >
                                Go to Dashboard
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-5 py-2.5 text-slate-300 hover:text-white font-medium transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn-primary"
                                >
                                    Get Started
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative z-10 flex-1 flex items-center">
                <div className="max-w-7xl mx-auto px-6 py-20 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left content */}
                        <div className="animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-8">
                                <Leaf className="w-4 h-4" />
                                <span>Join the Green Revolution</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
                                Track Your
                                <br />
                                <span className="gradient-text">Carbon Impact</span>
                            </h1>

                            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
                                CarbonCut empowers you to understand and reduce your environmental impact with AI-powered insights and beautiful visualizations.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
                                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1"
                                >
                                    Start Your Journey
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                    Learn More
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-12 mt-16">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                                        <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right content - Hero Visual */}
                        <div className="hidden lg:block relative">
                            <div className="relative w-full aspect-square max-w-lg mx-auto">
                                {/* Glowing orb */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" />

                                {/* Main circle */}
                                <div className="absolute inset-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border border-white/10 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-7xl font-bold gradient-text">0.0</div>
                                        <div className="text-slate-400 mt-2">kg CO₂ Today</div>
                                    </div>
                                </div>

                                {/* Floating cards */}
                                <div className="absolute top-0 right-0 glass-card p-4 animate-float" style={{ animationDelay: '0s' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                            <TrendingDown className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white">-23%</div>
                                            <div className="text-xs text-slate-400">This Week</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 glass-card p-4 animate-float" style={{ animationDelay: '2s' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-amber-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white">5 Day Streak</div>
                                            <div className="text-xs text-slate-400">Keep going!</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-1/2 -left-8 glass-card p-4 animate-float" style={{ animationDelay: '1s' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center">
                                            <Users className="w-5 h-5 text-teal-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white">Level 5</div>
                                            <div className="text-xs text-slate-400">Eco Warrior</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Why Choose CarbonCut?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Our powerful tools help you understand and reduce your carbon footprint with ease.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="glass-card p-8 card-hover animate-slide-up"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                                        feature.color === 'amber' ? 'bg-amber-500/20 text-amber-400' :
                                            'bg-teal-500/20 text-teal-400'
                                    }`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="glass-card p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10" />
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
                            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                                Join thousands of eco-conscious individuals tracking their carbon footprint and making greener choices every day.
                            </p>
                            <button
                                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
                                className="btn-primary text-lg px-10 py-4"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/20 p-2 rounded-xl">
                            <Leaf className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-lg font-bold text-white">CarbonCut</span>
                    </div>
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} CarbonCut. Building a greener tomorrow.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
