import React, { useState } from 'react';
import { Car, Utensils, Home, Calculator, RotateCcw, Loader2 } from 'lucide-react';

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

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="flex border-b border-gray-100 overflow-x-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors whitespace-nowrap
                ${activeTab === tab.id
                                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                                    : 'text-charcoal-light hover:text-charcoal-dark hover:bg-gray-50'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
                {activeTab === 'transport' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-charcoal-dark">Transport Details</h3>
                        <div>
                            <label className="block text-sm font-medium text-charcoal-light mb-1">Distance (km)</label>
                            <input
                                type="number"
                                value={formData.transport.km}
                                onChange={(e) => handleInputChange('transport', 'km', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="e.g. 20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-charcoal-light mb-1">Mode of Transport</label>
                            <select
                                value={formData.transport.type}
                                onChange={(e) => handleInputChange('transport', 'type', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                <option value="car">Car</option>
                                <option value="public">Public Transport</option>
                            </select>
                        </div>
                    </div>
                )}

                {activeTab === 'food' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-charcoal-dark">Daily Food Consumption</h3>
                        <div>
                            <label className="block text-sm font-medium text-charcoal-light mb-1">Diet Type</label>
                            <select
                                value={formData.food.type}
                                onChange={(e) => handleInputChange('food', 'type', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                <option value="meat">Meat-heavy</option>
                                <option value="vegetarian">Vegetarian</option>
                            </select>
                        </div>
                    </div>
                )}

                {activeTab === 'energy' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-charcoal-dark">Home Energy Use</h3>
                        <div>
                            <label className="block text-sm font-medium text-charcoal-light mb-1">Electricity Usage</label>
                            <select
                                value={formData.energy.usage}
                                onChange={(e) => handleInputChange('energy', 'usage', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-4">
                <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-charcoal-light bg-white border border-gray-200 hover:bg-gray-50 hover:text-charcoal-dark transition-colors"
                >
                    <RotateCcw className="w-5 h-5" />
                    Reset
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-charcoal-dark text-white py-3 px-6 rounded-lg font-semibold hover:bg-charcoal transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Calculator className="w-5 h-5" />
                            Calculate My Footprint
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ActivityTracker;
