import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityTracker from './ActivityTracker';
import AnalysisResults from './AnalysisResults';
import GamificationPanel from './GamificationPanel';
import { Leaf, LogOut, User, ChevronDown, Trophy, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:3001/api';

const Dashboard = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userStats, setUserStats] = useState(null);

  const { user, logout, getAuthHeaders } = useAuth();
  const navigate = useNavigate();

  // Fetch user stats on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/carbon/stats`, {
          headers: getAuthHeaders()
        });
        if (response.ok) {
          const data = await response.json();
          setUserStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  const calculateFootprint = async (data) => {
    setIsLoading(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Transport: Car (0.2), Public (0.05) per km
    let transport = 0;
    if (data.transport.km) {
      const km = parseFloat(data.transport.km);
      const factors = { car: 0.2, public: 0.05, bike: 0, walk: 0 };
      transport = km * (factors[data.transport.type] || 0.2);
    }

    // Food: Meat (7), Veg (3) per day
    const foodFactors = { meat: 7, vegetarian: 3, vegan: 1.5 };
    const food = foodFactors[data.food.type] || 3;

    // Energy: Low (3), Medium (6), High (12)
    const energyFactors = { low: 3, medium: 6, high: 12 };
    const energy = energyFactors[data.energy.usage] || 6;

    const breakdown = { transport, food, energy };
    const total = transport + food + energy;

    // Generate Recommendations
    const defaultRecommendations = {
      transport: [
        "Consider carpooling or using ride-share apps to halve your commute emissions.",
        "For short trips under 5km, biking or walking produces zero emissions.",
        "Check if your route is serviced by an express bus or train line."
      ],
      food: [
        "Try 'Meatless Mondays' to reduce your dietary carbon footprint by ~15%.",
        "Source seasonal and local produce to cut down on transportation emissions.",
        "Reduce food waste by planning meals ahead; composting helps too!"
      ],
      energy: [
        "Switch to LED bulbs; they use 75% less energy than incandescent lighting.",
        "Unplug electronics when not in use to eliminate 'vampire' power drain.",
        "Adjust your thermostat by 1°C; it can save up to 10% on your energy bill."
      ]
    };

    // Determine highest category
    let highestCategory = 'transport';
    let maxVal = 0;
    Object.entries(breakdown).forEach(([key, val]) => {
      if (val > maxVal) {
        maxVal = val;
        highestCategory = key;
      }
    });

    let currentRecommendations = defaultRecommendations[highestCategory];

    // Carbon-Aware Logic Override (Backend Fetch)
    if (data.energy.usage === 'high' && data.energy.city) {
      try {
        const response = await fetch(`${API_URL}/carbon-intensity?city=${encodeURIComponent(data.energy.city)}`);
        if (response.ok) {
          const apiData = await response.json();
          currentRecommendations = apiData.recommendations;
        }
      } catch (error) {
        console.error("Error fetching carbon intensity data:", error);
      }
    }

    // Save to backend
    try {
      await fetch(`${API_URL}/carbon/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ breakdown, total })
      });
    } catch (error) {
      console.error('Failed to save carbon data:', error);
    }

    setResults({
      total,
      breakdown,
      recommendations: currentRecommendations
    });
    setIsLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col font-sans relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-50 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-500/30">
              <Leaf className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Carbon<span className="text-emerald-400">Cut</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* User Stats */}
            {userStats && userStats.streak > 0 && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">{userStats.streak} day streak!</span>
              </div>
            )}

            {/* Date display */}
            <div className="hidden sm:block text-sm text-slate-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-white">{user?.name || 'User'}</div>
                  <div className="text-xs text-slate-400">Level {user?.level || 1}</div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 glass-card py-2 animate-scale-in">
                  <div className="px-4 py-3 border-b border-white/5">
                    <div className="text-sm font-medium text-white">{user?.name}</div>
                    <div className="text-xs text-slate-400">{user?.email}</div>
                  </div>
                  <div className="py-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                      <History className="w-4 h-4" />
                      History
                    </button>
                  </div>
                  <div className="border-t border-white/5 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="glass-card p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome back, {user?.name?.split(' ')[0] || 'Eco Warrior'}! 👋
            </h2>
            <p className="text-slate-400">Track your daily activities and reduce your carbon footprint.</p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{user?.totalPoints || 0}</div>
                <div className="text-xs text-slate-400">Total Points</div>
              </div>
              <div className="h-12 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">Level {user?.level || 1}</div>
                <div className="text-xs text-slate-400">Current Level</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Tracker & Gamification */}
          <div className="lg:col-span-8 space-y-6">
            <section className="glass-card overflow-hidden">
              <ActivityTracker onCalculate={calculateFootprint} isLoading={isLoading} />
            </section>

            <section className="glass-card overflow-hidden">
              <GamificationPanel currentScore={results?.total} />
            </section>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <AnalysisResults results={results} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">Powered by CarbonCut AI</p>
        </div>
      </footer>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
