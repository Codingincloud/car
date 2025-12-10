import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Share2, Medal, Lock, TrendingDown } from 'lucide-react';

const GamificationPanel = ({ currentScore }) => {
    const [history, setHistory] = useState([]);
    const [streak, setStreak] = useState(0);
    const [championBadge, setChampionBadge] = useState(false);
    const [showShareToast, setShowShareToast] = useState(false);

    // Load history from localStorage on mount
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

    // Update history when currentScore changes
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

        // Footprint Streak (Current < Previous)
        let currentStreak = 0;
        for (let i = data.length - 1; i > 0; i--) {
            if (data[i].score < data[i - 1].score) {
                currentStreak++;
            } else {
                break;
            }
        }
        setStreak(currentStreak);

        // Carbon Champion (Last 5 days < 5kg)
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
        const text = `Just achieved a ${streak}-day reduction streak with #CarbonCut! Join me to beat climate change!`;

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

    return (
        <div className="bg-surface rounded-2xl shadow-lg shadow-black/30 border border-white/5 p-6 h-full flex flex-col animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                Achievements
            </h2>

            <div className="space-y-5 flex-1">
                {/* Carbon Streak Badge - PROMINENT */}
                <div className="relative overflow-hidden rounded-2xl p-6 border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent">
                    {/* Glow Effect */}
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
                            <p className="text-xs text-text-muted mt-2 font-medium">
                                Consecutive days reducing your footprint!
                            </p>
                        </div>

                        {/* Flame Icon - Prominent with Glow */}
                        <div className={`relative p-5 rounded-full transition-all duration-500 ${streak > 0
                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-2xl shadow-emerald-500/50'
                            : 'bg-white/10 text-gray-500'
                            }`}>
                            <Flame className={`w-10 h-10 ${streak > 0 ? 'animate-pulse' : ''}`} />
                            {streak > 0 && (
                                <div className="absolute inset-0 rounded-full bg-emerald-400/50 blur-xl animate-pulse"></div>
                            )}
                        </div>
                    </div>

                    {/* Streak Progress Dots */}
                    {streak > 0 && (
                        <div className="flex gap-1.5 mt-4">
                            {[...Array(Math.min(streak, 7))].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-500/50"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                />
                            ))}
                            {streak > 7 && (
                                <span className="text-xs text-emerald-400 font-bold ml-1">+{streak - 7}</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Badges Section */}
                <div>
                    <h3 className="text-sm font-bold text-white mb-3">Badges</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${championBadge
                            ? 'bg-primary/10 border-primary/20 shadow-sm'
                            : 'bg-background border-white/5 opacity-60'
                            }`}>
                            <div className={`p-3 rounded-full ${championBadge
                                ? 'bg-primary text-white shadow-md shadow-primary/30'
                                : 'bg-white/10 text-gray-500'
                                }`}>
                                {championBadge ? <Medal className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">Carbon Champion</p>
                                <p className="text-xs text-text-muted mt-0.5">Maintain low impact (&lt;5kg) for 5 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Button */}
            <div className="mt-5 pt-5 border-t border-white/5">
                <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                >
                    <Share2 className="w-4 h-4" />
                    Share Progress
                </button>
                {showShareToast && (
                    <p className="text-xs text-primary text-center mt-2 font-medium animate-in fade-in slide-in-from-bottom-1">
                        Copied to clipboard!
                    </p>
                )}
            </div>
        </div>
    );
};

export default GamificationPanel;
