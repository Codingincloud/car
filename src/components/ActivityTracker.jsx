import React, { useState } from 'react';
import { Car, Utensils, Home, Calculator, RotateCcw, Zap } from 'lucide-react';

const ActivityTracker = ({ onCalculate, isLoading }) => {
    const [activeTab, setActiveTab] = useState('transport');
    const initialData = {
        transport: { km: '', type: 'car' },
        food: { type: 'meat' },
        energy: { usage: 'medium' },
    };
    const [formData, setFormData] = useState(initialData);

    const handleInputChange = (category, field, value) => {
        setFormData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
    };

    const handleReset = () => {
        setFormData(initialData);
    };

    const handleSubmit = () => {
        onCalculate(formData);
    };

    const tabs = [
        { id: 'transport', label: 'Transport', icon: Car },
        { id: 'food', label: 'Food', icon: Utensils },
        { id: 'energy', label: 'Home Energy', icon: Home },
    ];

    // Conditional classes for loading state
    const loadingInputClass = isLoading ? 'opacity-50 pointer-events-none' : '';

    return (
        <div className="flex flex-col h-full bg-surface text-text-main">
            <div className={`flex border-b border-white/5 overflow-x-auto bg-black/20 ${loadingInputClass}`}>
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            disabled={isLoading}
                            className={`flex-1 py-5 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-all relative
                ${activeTab === tab.id
                                    ? 'text-primary bg-surface shadow-[0_-1px_2px_rgba(0,0,0,0.2)]'
                                    : 'text-text-muted hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary' : 'text-gray-500'}`} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className={`p-8 flex-1 overflow-y-auto ${loadingInputClass}`}>
                {activeTab === 'transport' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                                <Car className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Transport Details</h3>
                                <p className="text-sm text-text-muted">Track your daily commute impact.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-text-muted mb-2">Distance (km)</label>
                                <input
                                    type="number"
                                    value={formData.transport.km}
                                    onChange={(e) => handleInputChange('transport', 'km', e.target.value)}
                                    disabled={isLoading}
                                    className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-white placeholder-gray-600"
                                    placeholder="e.g. 20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text-muted mb-2">Mode of Transport</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['car', 'public'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => handleInputChange('transport', 'type', type)}
                                            disabled={isLoading}
                                            className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${formData.transport.type === type
                                                ? 'border-primary bg-primary/10 text-primary'
                                                : 'border-white/10 bg-background hover:border-white/20 text-text-muted'
                                                }`}
                                        >
                                            {type === 'car' ? 'Car' : 'Public Transport'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'food' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                                <Utensils className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Daily Diet</h3>
                                <p className="text-sm text-text-muted">What did you eat today?</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-text-muted mb-3">Diet Type</label>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { id: 'meat', label: 'Meat-heavy', desc: 'Includes red meat & poultry' },
                                    { id: 'vegetarian', label: 'Vegetarian', desc: 'Plant-based with dairy/eggs' }
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleInputChange('food', 'type', option.id)}
                                        disabled={isLoading}
                                        className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${formData.food.type === option.id
                                            ? 'border-accent bg-accent/10 shadow-sm'
                                            : 'border-white/10 bg-background hover:border-white/20'
                                            }`}
                                    >
                                        <div>
                                            <div className={`font-semibold ${formData.food.type === option.id ? 'text-accent' : 'text-text-main'}`}>
                                                {option.label}
                                            </div>
                                            <div className="text-xs text-text-muted mt-0.5">{option.desc}</div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.food.type === option.id ? 'border-accent' : 'border-gray-600'
                                            }`}>
                                            {formData.food.type === option.id && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'energy' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-secondary/10 rounded-xl border border-secondary/20">
                                <Home className="w-6 h-6 text-secondary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Home Energy</h3>
                                <p className="text-sm text-text-muted">Electricity usage estimation.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-text-muted mb-3">Usage Level</label>
                                <div className="flex gap-2">
                                    {['low', 'medium', 'high'].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => handleInputChange('energy', 'usage', level)}
                                            disabled={isLoading}
                                            className={`flex-1 py-3 rounded-xl border text-sm font-medium capitalize transition-all ${formData.energy.usage === level
                                                ? 'border-secondary bg-secondary/10 text-secondary'
                                                : 'border-white/10 bg-background hover:border-white/20 text-text-muted'
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {formData.energy.usage === 'high' && (
                                <div className="animate-slide-up bg-background p-4 rounded-xl border border-white/10">
                                    <label className="block text-sm font-semibold text-text-muted mb-2">City / Location</label>
                                    <input
                                        type="text"
                                        value={formData.energy.city || ''}
                                        onChange={(e) => handleInputChange('energy', 'city', e.target.value)}
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 bg-surface border border-white/10 rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-white placeholder-gray-600"
                                        placeholder="e.g. Boston"
                                    />
                                    <p className="text-xs text-secondary mt-2 flex items-center gap-1">
                                        <Zap className="w-3 h-3" />
                                        Checking local grid carbon intensity...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 border-t border-white/5 bg-black/20 flex gap-4">
                <button
                    onClick={handleReset}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-text-muted bg-background border border-white/10 hover:bg-white/5 hover:text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-90 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isLoading ? (
                        <div className="loader-dots text-white">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    ) : (
                        <>
                            <Calculator className="w-5 h-5" />
                            Calculate Footprint
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ActivityTracker;
