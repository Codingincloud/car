import React, { useState } from 'react';
import ActivityTracker from './ActivityTracker';
import AnalysisResults from './AnalysisResults';
import { Leaf } from 'lucide-react';

const Dashboard = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateFootprint = (data) => {
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
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

      setResults({
        total: transport + food + energy,
        breakdown: {
          transport,
          food,
          energy
        }
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal-dark">
              Carbon<span className="text-primary">Cut</span>
            </h1>
          </div>
          <div className="text-sm text-charcoal-light hidden sm:block">
            Daily Analyzer
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="lg:col-span-2">
            <ActivityTracker onCalculate={calculateFootprint} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-1">
            <AnalysisResults results={results} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-6 shrink-0">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-charcoal-light font-medium">Powered by CarbonCut AI</p>
          <p className="text-xs text-gray-400 mt-1">© {new Date().getFullYear()} CarbonCut. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
