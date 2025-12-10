import React, { useState } from 'react';
import { Car, Utensils, Home, Calculator, RotateCcw, Zap, Bike, Train, Leaf } from 'lucide-react';

const ActivityTracker = ({ onCalculate, isLoading }) => {
    const [activeTab, setActiveTab] = useState('transport');
    const initialData = {
        transport: { km: '', type: 'car' },
        food: { type: 'meat' },
        energy: { usage: 'medium', city: '' },
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
        { id: 'transport', label: 'Transport', icon: Car, color: 'emerald' },
        { id: 'food', label: 'Food', icon: Utensils, color: 'amber' },
        { id: 'energy', label: 'Home Energy', icon: Home, color: 'teal' },
    ];

    const transportOptions = [
        { id: 'car', label: 'Car', icon: Car, emission: 'High' },
        { id: 'public', label: 'Public Transport', icon: Train, emission: 'Low' },
        { id: 'bike', label: 'Bicycle', icon: Bike, emission: 'Zero' },
    ];

    const foodOptions = [
        { id: 'meat', label: 'Meat-heavy', desc: 'Includes red meat & poultry', impact: 'High' },
        { id: 'vegetarian', label: 'Vegetarian', desc: 'Plant-based with dairy/eggs', impact: 'Medium' },
        { id: 'vegan', label: 'Vegan', desc: 'Fully plant-based diet', impact: 'Low' },
    ];

    const loadingInputClass = isLoading ? 'opacity-50 pointer-events-none' : '';

    return (
        <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className={`flex border-b border-white/5 bg-black/20 ${loadingInputClass}`}>
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            disabled={isLoading}
                            className={`flex-1 py-5 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-all relative
                                ${isActive
                                    ? 'text-white bg-white/5'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? `text-${tab.color}-400` : ''}`} />
                            <span className="hidden sm:inline">{tab.label}</span>
                            {isActive && (
                                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-${tab.color}-400`} />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className={`p-6 md:p-8 flex-1 ${loadingInputClass}`}>
                {/* Transport Tab */}
                {activeTab === 'transport' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <Car className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Transport Details</h3>
                                <p className="text-sm text-slate-400">Track your daily commute impact</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Distance Traveled (km)
                                </label>
                                <input
                                    type="number"
                                    value={formData.transport.km}
                                    onChange={(e) => handleInputChange('transport', 'km', e.target.value)}
                                    disabled={isLoading}
                                    className="input-field"
                                    placeholder="e.g. 20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-3">
                                    Mode of Transport
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {transportOptions.map((option) => {
                                        const Icon = option.icon;
                                        const isSelected = formData.transport.type === option.id;
                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => handleInputChange('transport', 'type', option.id)}
                                                disabled={isLoading}
                                                className={`p-4 rounded-xl border text-center transition-all ${isSelected
                                                        ? 'border-emerald-500/50 bg-emerald-500/10'
                                                        : 'border-white/10 bg-white/5 hover:border-white/20'
                                                    }`}
                                            >
                                                <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                                                <div className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                                    {option.label}
                                                </div>
                                                <div className={`text-xs mt-1 ${option.emission === 'Zero' ? 'text-emerald-400' :
                                                        option.emission === 'Low' ? 'text-teal-400' :
                                                            'text-amber-400'
                                                    }`}>
                                                    {option.emission} Impact
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Food Tab */}
                {activeTab === 'food' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                <Utensils className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Daily Diet</h3>
                                <p className="text-sm text-slate-400">What did you eat today?</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-3">Diet Type</label>
                            <div className="space-y-3">
                                {foodOptions.map((option) => {
                                    const isSelected = formData.food.type === option.id;
                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => handleInputChange('food', 'type', option.id)}
                                            disabled={isLoading}
                                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${isSelected
                                                    ? 'border-amber-500/50 bg-amber-500/10'
                                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-amber-500/20' : 'bg-white/5'
                                                    }`}>
                                                    {option.id === 'vegan' ? (
                                                        <Leaf className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                                                    ) : (
                                                        <Utensils className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                                                        {option.label}
                                                    </div>
                                                    <div className="text-xs text-slate-400 mt-0.5">{option.desc}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${option.impact === 'Low' ? 'bg-emerald-500/20 text-emerald-400' :
                                                        option.impact === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                                                            'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {option.impact}
                                                </span>
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-amber-400' : 'border-slate-600'
                                                    }`}>
                                                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Energy Tab */}
                {activeTab === 'energy' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20">
                                <Home className="w-6 h-6 text-teal-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Home Energy</h3>
                                <p className="text-sm text-slate-400">Electricity usage estimation</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-3">Usage Level</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['low', 'medium', 'high'].map((level) => {
                                        const isSelected = formData.energy.usage === level;
                                        return (
                                            <button
                                                key={level}
                                                onClick={() => handleInputChange('energy', 'usage', level)}
                                                disabled={isLoading}
                                                className={`py-4 rounded-xl border text-sm font-medium capitalize transition-all ${isSelected
                                                        ? 'border-teal-500/50 bg-teal-500/10 text-teal-400'
                                                        : 'border-white/10 bg-white/5 hover:border-white/20 text-slate-300'
                                                    }`}
                                            >
                                                {level}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {formData.energy.usage === 'high' && (
                                <div className="animate-slide-up p-4 rounded-xl border border-teal-500/20 bg-teal-500/5">
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                                        City / Location
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.energy.city || ''}
                                        onChange={(e) => handleInputChange('energy', 'city', e.target.value)}
                                        disabled={isLoading}
                                        className="input-field"
                                        placeholder="e.g. Boston"
                                    />
                                    <p className="text-xs text-teal-400 mt-3 flex items-center gap-1">
                                        <Zap className="w-3 h-3" />
                                        We'll check your local grid carbon intensity for personalized tips
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-white/5 bg-black/20 flex gap-4">
                <button
                    onClick={handleReset}
                    disabled={isLoading}
                    className="btn-secondary"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 btn-primary"
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
