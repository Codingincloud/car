import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
            <div className="max-w-3xl text-center space-y-8">
                <div className="flex justify-center mb-6">
                    <div className="bg-primary/10 p-4 rounded-full">
                        <Leaf className="w-16 h-16 text-primary" />
                    </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-charcoal-dark tracking-tight">
                    Carbon<span className="text-primary">Cut</span>
                </h1>

                <p className="text-xl md:text-2xl text-charcoal-light max-w-2xl mx-auto leading-relaxed">
                    AI-Powered Daily Carbon Footprint Analyzer. <br />
                    Track, Analyze, and Reduce your impact on the planet.
                </p>

                <div className="pt-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-primary rounded-full hover:bg-primary-dark hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Get Started
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            <footer className="absolute bottom-6 text-charcoal-light/60 text-sm">
                © {new Date().getFullYear()} CarbonCut. All rights reserved.
            </footer>
        </div>
    );
};

export default LandingPage;
