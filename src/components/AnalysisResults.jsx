import React from 'react';
import { BarChart3, Leaf, Lightbulb, Sparkles, TrendingDown } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend,
    LineChart, Line, Area, AreaChart
} from 'recharts';
import GaugeChart from 'react-gauge-chart';

const AnalysisResults = ({ results }) => {
    if (!results) {
        return (
            <div className="bg-surface rounded-2xl shadow-lg shadow-black/30 border border-white/5 p-8 h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-white/5 p-6 rounded-full animate-pulse">
                    <BarChart3 className="w-10 h-10 text-gray-500" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">No Data Yet</h3>
                    <p className="text-text-muted text-sm mt-2 max-w-[200px] mx-auto leading-relaxed">
                        Fill in your daily activities and click calculate to see your analysis.
                    </p>
                </div>
            </div>
        );
    }

    const total = results.total || 0;
    const breakdown = results.breakdown || {};

    // Rating logic
    let rating = 'Moderate Impact';
    if (total < 5) {
        rating = 'Low Impact';
    } else if (total > 15) {
        rating = 'High Impact';
    }

    // Gauge percent: map 0-25 kg to 0-1 (capped at 25 for visual)
    const maxScore = 25;
    const gaugePercent = Math.min(total / maxScore, 1);

    // Stacked Bar Chart Data
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

    // Custom Tooltip for Stacked Bar
    const CustomBarTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const totalValue = payload.reduce((sum, entry) => sum + entry.value, 0);
            return (
                <div className="bg-surface border border-white/10 rounded-xl p-3 shadow-xl">
                    <p className="text-white font-semibold mb-2">Emission Breakdown</p>
                    {payload.map((entry, index) => {
                        const percent = totalValue > 0 ? ((entry.value / totalValue) * 100).toFixed(1) : 0;
                        return (
                            <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }}></div>
                                <span className="text-text-muted">{entry.name}:</span>
                                <span className="text-white font-medium">{entry.value.toFixed(1)} kg</span>
                                <span className="text-gray-500">({percent}%)</span>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return null;
    };

    // 7-Day Trend Mock Data (slightly descending)
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
        <div className="bg-surface rounded-2xl shadow-lg shadow-black/30 border border-white/5 p-6 h-full flex flex-col animate-slide-up-fade overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Analysis Results
            </h2>

            <div className="flex-1 flex flex-col gap-5">
                {/* Total Score Display */}
                <div className="text-center py-3 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-3xl font-bold text-white">{total.toFixed(1)}</span>
                    <span className="text-text-muted text-sm ml-2">kg CO₂e today</span>
                </div>

                {/* Stacked Bar Chart */}
                <div className="shrink-0">
                    <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
                        Emission Breakdown by Source
                    </h3>
                    <div className="h-24 w-full">
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
                            <div key={key} className="flex items-center gap-1.5 text-xs text-text-muted">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[key] }}></div>
                                {key}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7-Day Trend Line Chart */}
                <div className="shrink-0">
                    <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-primary" />
                        7-Day Footprint Trend
                    </h3>
                    <div className="h-32 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00A389" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00A389" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                                />
                                <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#2D3748',
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
                                    stroke="#00A389"
                                    strokeWidth={2}
                                    fill="url(#trendGradient)"
                                    dot={{ fill: '#00A389', strokeWidth: 0, r: 3 }}
                                    activeDot={{ r: 5, fill: '#00A389', stroke: '#fff', strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Impact Gauge Visualization */}
                <div className="shrink-0">
                    <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-2 text-center">
                        Impact Rating
                    </h3>
                    <div className="mx-auto" style={{ maxWidth: '180px' }}>
                        <GaugeChart
                            id="impact-gauge"
                            nrOfLevels={3}
                            colors={['#34D399', '#F59E0B', '#EF4444']}
                            arcWidth={0.25}
                            percent={gaugePercent}
                            textColor="#FFFFFF"
                            needleColor="#E2E8F0"
                            needleBaseColor="#E2E8F0"
                            formatTextValue={() => `${total.toFixed(1)} kg`}
                            animateDuration={1500}
                            animate={true}
                        />
                    </div>
                    <div className="text-center">
                        <span className={`text-sm font-bold ${total < 5 ? 'text-emerald-400' : total > 15 ? 'text-red-400' : 'text-amber-400'}`}>
                            {rating}
                        </span>
                    </div>
                </div>

                {/* AI Insights Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/40 to-black/20 p-4 text-white shadow-xl shrink-0 group border border-white/5">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-20 w-20 rounded-full bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                                <Lightbulb className="w-3.5 h-3.5 text-accent" />
                            </div>
                            <h3 className="font-bold text-sm flex items-center gap-2">
                                AI Insights <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                            </h3>
                        </div>

                        <div className="space-y-1.5">
                            {currentRecommendations.slice(0, 2).map((rec, index) => (
                                <div key={index} className="flex gap-2 text-xs text-text-muted leading-relaxed">
                                    <span className="text-primary mt-0.5">•</span>
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
