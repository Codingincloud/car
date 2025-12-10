import React from 'react';
import { BarChart3, Leaf, AlertCircle, Lightbulb, Trophy, Share2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { getRating } from '../utils/calculator';

const AnalysisResults = ({ results }) => {
    if (!results) {
        return (
            <div className="glass h-full flex flex-col items-center justify-center text-center p-8 rounded-3xl border-none">
                <div className="bg-white/5 p-6 rounded-full mb-4 animate-pulse">
                    <BarChart3 className="w-12 h-12 text-text-muted" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Awaiting Data</h3>
                <p className="text-text-muted max-w-xs">
                    Complete the activity tracker to reveal your carbon footprint analysis.
                </p>
            </div>
        );
    }

    const { total, breakdown } = results;
    const rating = getRating(total);

    const data = [
        { name: 'Transport', value: breakdown.transport || 0, color: '#3B82F6' },
        { name: 'Food', value: breakdown.food || 0, color: '#10B981' },
        { name: 'Energy', value: breakdown.energy || 0, color: '#F59E0B' },
    ].filter(item => item.value > 0);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass h-full flex flex-col p-6 rounded-3xl border-none overflow-y-auto custom-scrollbar"
        >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-primary" />
                    <span className="text-glow">Analysis</span>
                </h2>
                <button className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 flex flex-col gap-8">
                {/* Score Card */}
                <div className="text-center relative py-8">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-2xl blur-xl" />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="relative"
                    >
                        <span className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            {total}
                        </span>
                        <span className="text-xl text-primary font-bold ml-2">kg CO₂e</span>
                    </motion.div>

                    <div className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${rating.bg} ${rating.border} ${rating.color}`}>
                        <Trophy className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">{rating.label}</span>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-64 w-full relative">
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
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-white/70 ml-1">{value}</span>} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text in Donut */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <div className="text-xs text-text-muted uppercase tracking-wider">Breakdown</div>
                        </div>
                    </div>
                </div>

                {/* AI Insights */}
                <div className="glass-card p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Lightbulb className="w-24 h-24 text-yellow-400 rotate-12" />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        Quick Tips
                    </h3>

                    <ul className="space-y-3 relative z-10">
                        <li className="flex gap-3 text-sm text-gray-300">
                            <span className="text-primary mt-0.5">•</span>
                            <span>Switching to a vegetarian diet effectively halves your food-related emissions.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-gray-300">
                            <span className="text-primary mt-0.5">•</span>
                            <span>Driving an EV charged with renewables can reduce transport emissions by ~90%.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

export default AnalysisResults;
