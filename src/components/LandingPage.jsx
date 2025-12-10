import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Globe, Zap, BarChart3 } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Hero Section */}
            <header className="relative overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-50" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
                    <div className="text-center max-w-3xl mx-auto animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6">
                            <Leaf className="w-4 h-4" />
                            <span>Sustainable Future</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-charcoal-dark tracking-tight mb-6 leading-tight">
                            Track, Reduce, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Sustain.</span>
                        </h1>
                        <p className="text-xl text-charcoal-light mb-10 leading-relaxed">
                            CarbonCut empowers you to understand your environmental impact and make smarter, greener choices every day.
                        </p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="group inline-flex items-center gap-2 bg-charcoal-dark text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-200 hover:-translate-y-1"
                        >
                            Start Your Journey
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Globe className="w-8 h-8 text-emerald-500" />,
                            title: "Global Impact",
                            desc: "See how your local actions contribute to global sustainability goals."
                        },
                        {
                            icon: <Zap className="w-8 h-8 text-amber-500" />,
                            title: "Real-time Insights",
                            desc: "Get instant feedback on your carbon footprint based on daily activities."
                        },
                        {
                            icon: <BarChart3 className="w-8 h-8 text-teal-500" />,
                            title: "Smart Analytics",
                            desc: "Visualize your progress with detailed charts and personalized tips."
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-charcoal-dark mb-3">{feature.title}</h3>
                            <p className="text-charcoal-light leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="bg-emerald-100 p-2 rounded-lg">
                            <Leaf className="w-6 h-6 text-emerald-600" />
                        </div>
                        <span className="text-xl font-bold text-charcoal-dark">CarbonCut</span>
                    </div>
                    <p className="text-charcoal-light">© {new Date().getFullYear()} CarbonCut. Building a greener tomorrow.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
