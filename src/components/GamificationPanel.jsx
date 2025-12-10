import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Share2, Medal, Lock, TrendingDown, Star, Target, Zap, Award } from 'lucide-react';

const GamificationPanel = ({ currentScore }) => {
    const [history, setHistory] = useState([]);
    const [streak, setStreak] = useState(0);
    const [championBadge, setChampionBadge] = useState(false);
    const [showShareToast, setShowShareToast] = useState(false);

    useEffect(() => {
        const savedHistory = localStorage.getItem('carbonHistory');
        if (savedHistory) {
            try {
                const parsed = JSON.parse(savedHistory);
                setHistory(parsed);
                calculateStats(parsed);
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    useEffect(() => {
        if (currentScore !== null && currentScore !== undefined) {
            const today = new Date().toISOString().split('T')[0];

            setHistory(prevHistory => {
                const newHistory = [...prevHistory];
                const existingIndex = newHistory.findIndex(item => item.date === today);

                if (existingIndex >= 0) {
                    newHistory[existingIndex] = { date: today, score: currentScore };
                } else {
                    newHistory.push({ date: today, score: currentScore });
                }

                newHistory.sort((a, b) => new Date(a.date) - new Date(b.date));

                localStorage.setItem('carbonHistory', JSON.stringify(newHistory));
                calculateStats(newHistory);
                return newHistory;
            });
        }
    }, [currentScore]);

    const calculateStats = (data) => {
        if (data.length < 2) {
            setStreak(0);
            setChampionBadge(false);
            return;
        }

        let currentStreak = 0;
        for (let i = data.length - 1; i > 0; i--) {
            if (data[i].score < data[i - 1].score) {
                currentStreak++;
            } else {
                break;
            }
        }
        setStreak(currentStreak);

        let lowImpactCount = 0;
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].score < 5) {
                lowImpactCount++;
            } else {
                break;
            }
        }
        setChampionBadge(lowImpactCount >= 5);
    };

    const handleShare = () => {
        const text = `🌱 Just achieved a ${streak}-day reduction streak with #CarbonCut! Join me to beat climate change!`;

        if (navigator.share) {
            navigator.share({
                title: 'CarbonCut Progress',
                text: text,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(text);
            setShowShareToast(true);
            setTimeout(() => setShowShareToast(false), 3000);
        }
    };

    const badges = [
        {
            id: 'champion',
            name: 'Carbon Champion',
            desc: 'Maintain low impact (<5kg) for 5 days',
            icon: Medal,
            unlocked: championBadge,
            color: 'emerald'
        },
        {
            id: 'starter',
            name: 'Eco Starter',
            desc: 'Complete your first tracking',
            icon: Star,
            unlocked: history.length > 0,
            color: 'amber'
        },
        {
            id: 'warrior',
            name: 'Weekly Warrior',
            desc: 'Track for 7 consecutive days',
            icon: Target,
            unlocked: history.length >= 7,
            color: 'teal'
        },
        {
            id: 'guru',
            name: 'Green Guru',
            desc: 'Reach level 10',
            icon: Award,
            unlocked: false,
            color: 'purple'
        }
    ];

    return (
        <div className="p-6 h-full flex flex-col">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Achievements
            </h2>

            <div className="space-y-5 flex-1">
                {/* Carbon Streak Badge */}
                <div className="relative overflow-hidden rounded-2xl p-6 border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl -ml-8 -mb-8"></div>

                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingDown className="w-4 h-4 text-emerald-400" />
                                <p className="text-sm text-emerald-400 font-bold uppercase tracking-wider">Carbon Streak</p>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-white drop-shadow-lg">{streak}</span>
                                <span className="text-lg text-emerald-300 font-semibold">days</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 font-medium">
                                Consecutive days reducing your footprint!
                            </p>
                        </div>

                        <div className={`relative p-5 rounded-full transition-all duration-500 ${streak > 0
                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-2xl shadow-emerald-500/50'
                            : 'bg-white/10 text-slate-500'
                            }`}>
                            <Flame className={`w-10 h-10 ${streak > 0 ? 'animate-pulse' : ''}`} />
                            {streak > 0 && (
                                <div className="absolute inset-0 rounded-full bg-emerald-400/50 blur-xl animate-pulse"></div>
                            )}
                        </div>
                    </div>

                    {streak > 0 && (
                        <div className="flex gap-1.5 mt-4">
                            {[...Array(Math.min(streak, 7))].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-500/50"
                                />
                            ))}
                            {streak > 7 && (
                                <span className="text-xs text-emerald-400 font-bold ml-1">+{streak - 7}</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Badges Grid */}
                <div>
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        Badges
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {badges.map((badge) => {
                            const Icon = badge.icon;
                            return (
                                <div
                                    key={badge.id}
                                    className={`p-4 rounded-xl border transition-all ${badge.unlocked
                                            ? `bg-${badge.color}-500/10 border-${badge.color}-500/30`
                                            : 'bg-white/5 border-white/5 opacity-60'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${badge.unlocked
                                            ? `bg-${badge.color}-500/20`
                                            : 'bg-white/10'
                                        }`}>
                                        {badge.unlocked ? (
                                            <Icon className={`w-5 h-5 text-${badge.color}-400`} />
                                        ) : (
                                            <Lock className="w-4 h-4 text-slate-500" />
                                        )}
                                    </div>
                                    <p className="font-semibold text-white text-sm">{badge.name}</p>
                                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{badge.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Share Button */}
            <div className="mt-5 pt-5 border-t border-white/5">
                <button
                    onClick={handleShare}
                    className="w-full btn-primary"
                >
                    <Share2 className="w-4 h-4" />
                    Share Progress
                </button>
                {showShareToast && (
                    <p className="text-xs text-emerald-400 text-center mt-2 font-medium animate-fade-in">
                        ✓ Copied to clipboard!
                    </p>
                )}
            </div>
        </div>
    );
};

export default GamificationPanel;
