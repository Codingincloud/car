import React, { useState } from 'react';
import ActivityTracker from './ActivityTracker';
import AnalysisResults from './AnalysisResults';
import GamificationPanel from './GamificationPanel';
import { Leaf } from 'lucide-react';

const Dashboard = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateFootprint = (data) => {
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(async () => {
      // Transport: Car (0.2), Public (0.05) per km
      let transport = 0;
      if (data.transport.km) {
        const km = parseFloat(data.transport.km);
        const factors = { car: 0.2, public: 0.05 };
        transport = km * (factors[data.transport.type] || 0.2);
      }

      // Food: Meat (7), Veg (3) per day
      const foodFactors = { meat: 7, vegetarian: 3 };
      const food = foodFactors[data.food.type] || 3;

      // Energy: Low (3), Medium (6), High (12)
      const energyFactors = { low: 3, medium: 6, high: 12 };
      const energy = energyFactors[data.energy.usage] || 6;

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
      const breakdown = { transport, food, energy };
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
          const response = await fetch(`/api/carbon-intensity?city=${encodeURIComponent(data.energy.city)}`);
          if (response.ok) {
            const apiData = await response.json();
            currentRecommendations = apiData.recommendations;
          } else {
            console.error("Failed to fetch carbon intensity data");
          }
        } catch (error) {
          console.error("Error fetching carbon intensity data:", error);
        }
      }

      setResults({
        total: transport + food + energy,
        breakdown,
        recommendations: currentRecommendations
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Glass Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-100 p-2 rounded-xl">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal-dark tracking-tight">
              Carbon<span className="text-emerald-500">Cut</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-charcoal-light bg-gray-100 px-3 py-1 rounded-full">
              {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 border-2 border-white shadow-sm"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          {/* Left Column: Tracker & Gamification */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <ActivityTracker onCalculate={calculateFootprint} isLoading={isLoading} />
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
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

      <footer className="bg-white border-t border-gray-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-charcoal-light font-medium">Powered by CarbonCut AI</p>
          <p className="text-xs text-gray-400 mt-2">© {new Date().getFullYear()} CarbonCut. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
