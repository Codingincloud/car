import React from 'react';
import { BarChart3, Leaf, Lightbulb, Sparkles, TrendingDown } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';

const AnalysisResults = ({ results }) => {
    if (!results) {
        return (
            <div className="glass-card p-8 h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-white/5 p-6 rounded-full animate-pulse">
                    <BarChart3 className="w-10 h-10 text-slate-500" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">No Data Yet</h3>
                    <p className="text-slate-400 text-sm mt-2 max-w-[200px] mx-auto leading-relaxed">
                        Fill in your daily activities and click calculate to see your analysis.
                    </p>
                </div>
            </div>
        );
    }

    const total = results.total || 0;
    const breakdown = results.breakdown || {};

    let rating = 'Moderate Impact';
    let ratingColor = 'text-amber-400';
    if (total < 5) {
        rating = 'Low Impact 🌱';
        ratingColor = 'text-emerald-400';
    } else if (total > 15) {
        rating = 'High Impact ⚠️';
        ratingColor = 'text-red-400';
    }

    const barData = [
        {
            name: 'Today',
            Transport: breakdown.transport || 0,
            Food: breakdown.food || 0,
            Energy: breakdown.energy || 0,
        }
    ];

    const COLORS = {
        Transport: '#3B82F6',
        Food: '#10B981',
        Energy: '#F59E0B'
    };

    const CustomBarTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const totalValue = payload.reduce((sum, entry) => sum + entry.value, 0);
            return (
                <div className="glass-card p-3 shadow-xl">
                    <p className="text-white font-semibold mb-2">Emission Breakdown</p>
                    {payload.map((entry, index) => {
                        const percent = totalValue > 0 ? ((entry.value / totalValue) * 100).toFixed(1) : 0;
                        return (
                            <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }}></div>
                                <span className="text-slate-400">{entry.name}:</span>
                                <span className="text-white font-medium">{entry.value.toFixed(1)} kg</span>
                                <span className="text-slate-500">({percent}%)</span>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return null;
    };

    const trendData = [
        { day: 'Mon', score: 12.5 },
        { day: 'Tue', score: 11.8 },
        { day: 'Wed', score: 10.2 },
        { day: 'Thu', score: 11.0 },
        { day: 'Fri', score: 9.5 },
        { day: 'Sat', score: 8.8 },
        { day: 'Sun', score: total > 0 ? total : 8.2 },
    ];

    const currentRecommendations = results.recommendations || [];

    return (
        <div className="glass-card p-6 h-full flex flex-col animate-slide-up-fade overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-400" />
                Analysis Results
            </h2>

            <div className="flex-1 flex flex-col gap-5">
                {/* Total Score */}
                <div className="text-center py-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                    <span className="text-5xl font-bold text-white">{total.toFixed(1)}</span>
                    <span className="text-slate-400 text-sm ml-2">kg CO₂e today</span>
                    <div className={`mt-2 text-sm font-semibold ${ratingColor}`}>
                        {rating}
                    </div>
                </div>

                {/* Stacked Bar Chart */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
                        Emission Breakdown
                    </h3>
                    <div className="h-20 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} layout="vertical" barCategoryGap="20%">
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" hide />
                                <Tooltip content={<CustomBarTooltip />} cursor={false} />
                                <Bar dataKey="Transport" stackId="a" fill={COLORS.Transport} radius={[4, 0, 0, 4]} />
                                <Bar dataKey="Food" stackId="a" fill={COLORS.Food} />
                                <Bar dataKey="Energy" stackId="a" fill={COLORS.Energy} radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                        {Object.keys(COLORS).map(key => (
                            <div key={key} className="flex items-center gap-1.5 text-xs text-slate-400">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[key] }}></div>
                                {key}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7-Day Trend */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-emerald-400" />
                        7-Day Trend
                    </h3>
                    <div className="h-28 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 11 }}
                                />
                                <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1E293B',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        padding: '8px 12px',
                                        color: '#fff'
                                    }}
                                    formatter={(value) => [`${value.toFixed(1)} kg`, 'CO₂e']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#10B981"
                                    strokeWidth={2}
                                    fill="url(#trendGradient)"
                                    dot={{ fill: '#10B981', strokeWidth: 0, r: 3 }}
                                    activeDot={{ r: 5, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Insights */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 border border-white/5">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-20 w-20 rounded-full bg-emerald-500/10 blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-white/10 rounded-lg">
                                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                            </div>
                            <h3 className="font-bold text-sm text-white flex items-center gap-2">
                                AI Insights <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                            </h3>
                        </div>

                        <div className="space-y-2">
                            {currentRecommendations.slice(0, 2).map((rec, index) => (
                                <div key={index} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                                    <span className="text-emerald-400 mt-0.5">•</span>
                                    <span className="line-clamp-2">{rec}</span>
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
