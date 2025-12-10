import React from 'react';
import { BarChart3, Leaf, AlertCircle, Lightbulb, Sparkles } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const AnalysisResults = ({ results }) => {
    if (!results) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-gray-100 p-4 rounded-full">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-charcoal-dark">No Data Yet</h3>
                    <p className="text-charcoal-light text-sm mt-1">
                        Fill in your daily activities and click calculate to see your carbon footprint analysis.
                    </p>
                </div>
            </div>
        );
    }

    const total = results.total || 0;
    const breakdown = results.breakdown || {};

    // Updated rating logic
    let rating = 'Moderate Impact';
    let colorClass = 'text-yellow-600 bg-yellow-50 border-yellow-200';

    if (total < 5) {
        rating = 'Low Impact';
        colorClass = 'text-green-600 bg-green-50 border-green-200';
    } else if (total > 15) {
        rating = 'High Impact';
        colorClass = 'text-red-600 bg-red-50 border-red-200';
    }

    const data = [
        { name: 'Transport', value: breakdown.transport || 0, color: '#3B82F6' }, // Blue
        { name: 'Food', value: breakdown.food || 0, color: '#10B981' },      // Green
        { name: 'Energy', value: breakdown.energy || 0, color: '#F59E0B' },    // Yellow
    ].filter(item => item.value > 0);

    // AI Insights Logic
    let highestCategory = 'transport';
    let maxVal = 0;
    Object.entries(breakdown).forEach(([key, val]) => {
        if (val > maxVal) {
            maxVal = val;
            highestCategory = key;
        }
    });

    const recommendations = {
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

    const currentRecommendations = recommendations[highestCategory] || recommendations.transport;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col overflow-y-auto">
            <h2 className="text-xl font-bold text-charcoal-dark mb-6 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Analysis Results
            </h2>

            <div className="flex-1 flex flex-col gap-6">
                {/* Donut Chart */}
                <div className="h-64 w-full shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `${value.toFixed(1)} kg`}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Impact Rating Badge */}
                <div className="text-center shrink-0">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${colorClass} transition-colors duration-300`}>
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-bold">{rating}</span>
                    </div>
                </div>

                {/* Total Score Card */}
                <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 shrink-0">
                    <p className="text-sm text-charcoal-light font-medium uppercase tracking-wide">Total Daily Footprint</p>
                    <div className="mt-2 flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-charcoal-dark">{total.toFixed(1)}</span>
                        <span className="text-lg text-charcoal-light">kg CO₂e</span>
                    </div>
                </div>

                {/* AI Insights Card */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-charcoal-dark to-charcoal p-6 text-white shadow-lg shrink-0">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                <Lightbulb className="w-5 h-5 text-yellow-300" />
                            </div>
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                AI Insights <Sparkles className="w-4 h-4 text-primary-light animate-pulse" />
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {currentRecommendations.map((rec, index) => (
                                <div key={index} className="flex gap-3 text-sm text-gray-200">
                                    <span className="text-primary-light">•</span>
                                    <span>{rec}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResults;
