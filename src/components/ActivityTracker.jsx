import React, { useState } from 'react';
import { Car, Utensils, Home, Calculator, RotateCcw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ActivityTracker = ({ onCalculate, isLoading }) => {
    const [activeTab, setActiveTab] = useState('transport');

    // Updated initial state to match new logic
    const initialData = {
        transport: { km: '', type: 'car_gasoline' },
        food: { type: 'average' },
        energy: { kwh: '', source: 'grid' },
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

    const handleCalculate = () => {
        // Basic validation
        if (activeTab === 'transport' && !formData.transport.km) return;
        if (activeTab === 'energy' && !formData.energy.kwh) return;
        onCalculate(formData);
    };

    const tabs = [
        { id: 'transport', label: 'Transport', icon: Car },
        { id: 'food', label: 'Food', icon: Utensils },
        { id: 'energy', label: 'Energy', icon: Zap },
    ];

    return (
        <div className="glass h-full flex flex-col rounded-3xl overflow-hidden border-none text-white transition-all duration-300">
            {/* Tabs Header */}
            <div className="flex border-b border-white/5 bg-black/20 backdrop-blur-md">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative flex-1 py-6 flex flex-col items-center justify-center gap-2 text-sm font-medium transition-all duration-300
                            ${isActive ? 'text-primary' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
                        >
                            <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : ''}`} />
                            {tab.label}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="p-8 flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                    >
                        {activeTab === 'transport' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    Transport Details
                                </h3>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Daily Distance (km)</label>
                                    <input
                                        type="number"
                                        value={formData.transport.km}
                                        onChange={(e) => handleInputChange('transport', 'km', e.target.value)}
                                        className="glass-input w-full"
                                        placeholder="e.g. 25"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Vehicle Type</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            { val: 'car_gasoline', label: 'Gasoline Car' },
                                            { val: 'car_diesel', label: 'Diesel Car' },
                                            { val: 'car_hybrid', label: 'Hybrid' },
                                            { val: 'car_ev', label: 'Electric (EV)' },
                                            { val: 'motorcycle', label: 'Motorcycle' },
                                            { val: 'bus', label: 'Bus' },
                                            { val: 'train', label: 'Train/Metro' },
                                        ].map((opt) => (
                                            <button
                                                key={opt.val}
                                                onClick={() => handleInputChange('transport', 'type', opt.val)}
                                                className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all text-left
                                                ${formData.transport.type === opt.val
                                                        ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                                                        : 'bg-white/5 border-transparent text-text-muted hover:bg-white/10'}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'food' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    Dietary Habits
                                </h3>
                                <p className="text-text-muted text-sm">Select the option that best describes your eating habits today.</p>

                                <div className="space-y-3">
                                    {[
                                        { val: 'meat_heavy', label: 'Meat Heavy', desc: 'Large portion of red meat' },
                                        { val: 'average', label: 'Average', desc: 'Moderate meat / Mixed diet' },
                                        { val: 'no_beef', label: 'No Beef', desc: 'Poultry, pork, fish, or eggs' },
                                        { val: 'vegetarian', label: 'Vegetarian', desc: 'No meat, includes dairy/eggs' },
                                        { val: 'vegan', label: 'Vegan', desc: 'Plant-based only' },
                                    ].map((opt) => (
                                        <button
                                            key={opt.val}
                                            onClick={() => handleInputChange('food', 'type', opt.val)}
                                            className={`w-full p-4 rounded-xl border text-left transition-all flex justify-between items-center group
                                            ${formData.food.type === opt.val
                                                    ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                                                    : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                                        >
                                            <div>
                                                <div className={`font-semibold ${formData.food.type === opt.val ? 'text-primary' : 'text-white'}`}>
                                                    {opt.label}
                                                </div>
                                                <div className="text-xs text-text-muted mt-1">{opt.desc}</div>
                                            </div>
                                            {formData.food.type === opt.val && (
                                                <motion.div layoutId="check" className="text-primary">
                                                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,1)]" />
                                                </motion.div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'energy' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    Home Energy
                                </h3>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Daily Electricity Usage (kWh)</label>
                                    <input
                                        type="number"
                                        value={formData.energy.kwh}
                                        onChange={(e) => handleInputChange('energy', 'kwh', e.target.value)}
                                        className="glass-input w-full"
                                        placeholder="Avg household is ~10-30 kWh"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Energy Source</label>
                                    <div className="flex gap-4">
                                        {[
                                            { val: 'grid', label: 'Standard Grid' },
                                            { val: 'renewable', label: 'Green / Renewable' },
                                        ].map((opt) => (
                                            <button
                                                key={opt.val}
                                                onClick={() => handleInputChange('energy', 'source', opt.val)}
                                                className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all
                                                ${formData.energy.source === opt.val
                                                        ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                                                        : 'bg-white/5 border-transparent text-text-muted hover:bg-white/10'}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Actions Footer */}
            <div className="p-6 border-t border-white/5 bg-black/20 backdrop-blur-md flex gap-4">
                <button
                    onClick={() => setFormData(initialData)}
                    className="p-3 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                    title="Reset Form"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
                <button
                    onClick={handleCalculate}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-dark to-primary text-white py-3 px-6 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
