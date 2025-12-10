import React, { useState, useEffect } from 'react';
import ActivityTracker from './ActivityTracker';
import AnalysisResults from './AnalysisResults';
import { Leaf, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateFootprint } from '../utils/calculator';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem('carboncut_last_result');
    if (saved) {
      setResults(JSON.parse(saved));
    }
  }, []);

  const handleCalculate = async (data) => {
    setIsLoading(true);

    // Simulate complex calculation aka "AI Processing"
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = calculateFootprint(data);
    setResults(result);
    localStorage.setItem('carboncut_last_result', JSON.stringify(result));

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen text-white selection:bg-primary/30">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <header className="fixed top-0 w-full z-50 glass border-b border-white/5 bg-black/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Carbon<span className="text-primary text-glow">Cut</span>
            </h1>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-[calc(100vh-6rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 h-full"
          >
            <ActivityTracker onCalculate={handleCalculate} isLoading={isLoading} />
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 h-full"
          >
            <AnalysisResults results={results} />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
