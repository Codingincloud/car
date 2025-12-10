import React, { useState, useEffect } from 'react';
import ActivityTracker from './ActivityTracker';
import AnalysisResults from './AnalysisResults';
import { Leaf, LogOut, Info, Trash2, Download, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateFootprint } from '../utils/calculator';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import EmissionFactorsModal from './EmissionFactorsModal';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear your current analysis?')) {
      setResults(null);
      localStorage.removeItem('carboncut_last_result');
    }
  };

  const handleDownloadCSV = () => {
    if (!results) return;

    const headers = ['Date', 'Transport (kg)', 'Food (kg)', 'Energy (kg)', 'Total (kg)'];
    const row = [
      new Date().toLocaleDateString(),
      results.breakdown.transport,
      results.breakdown.food,
      results.breakdown.energy,
      results.total
    ];

    const csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + row.join(",");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "carboncut_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen text-text-main selection:bg-primary/30">
      <EmissionFactorsModal isOpen={showFactors} onClose={() => setShowFactors(false)} />

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <header className="fixed top-0 w-full z-50 glass border-b border-white/5 bg-surface/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Carbon<span className="text-primary text-glow">Cut</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {results && (
              <>
                <button
                  onClick={handleDownloadCSV}
                  className="p-2 rounded-full hover:bg-white/10 text-text-muted hover:text-primary transition-colors"
                  title="Download Report"
                >
                  <Download className="w-5 h-5" />
                </button>

                <button
                  onClick={handleReset}
                  className="p-2 rounded-full hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-colors"
                  title="Reset Data"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </>
            )}

            <button
              onClick={() => setShowFactors(true)}
              className="p-2 rounded-full hover:bg-white/10 text-text-muted hover:text-text-main transition-colors"
              title="View Emission Factors"
            >
              <Info className="w-5 h-5" />
            </button>

            <div className="h-6 w-px bg-white/10 mx-2" />

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-text-muted">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span>{user?.name || 'User'}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-red-400 transition-colors p-2 hover:bg-white/5 rounded-lg"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
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
