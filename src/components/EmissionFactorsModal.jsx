import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';

const EmissionFactorsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const factors = {
        Transport: [
            { label: 'Gasoline Car', value: '0.192 kg/km' },
            { label: 'Diesel Car', value: '0.171 kg/km' },
            { label: 'Hybrid', value: '0.110 kg/km' },
            { label: 'EV (Grid)', value: '0.053 kg/km' },
            { label: 'Bus', value: '0.105 kg/km' },
            { label: 'Train', value: '0.041 kg/km' },
        ],
        Food: [
            { label: 'Meat Heavy', value: '7.2 kg/day' },
            { label: 'Average', value: '5.6 kg/day' },
            { label: 'No Beef', value: '3.9 kg/day' },
            { label: 'Vegetarian', value: '2.9 kg/day' },
            { label: 'Vegan', value: '2.0 kg/day' },
        ],
        Energy: [
            { label: 'Standard Grid', value: '0.475 kg/kWh' },
            { label: 'Renewable', value: '0.050 kg/kWh' },
        ]
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 glass-card w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 text-text-main"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Info className="text-primary w-6 h-6" />
                        Calculation Factors
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {Object.entries(factors).map(([category, items]) => (
                        <div key={category}>
                            <h3 className="font-semibold text-primary mb-3 border-b border-white/10 pb-2">{category}</h3>
                            <ul className="space-y-2">
                                {items.map((item, idx) => (
                                    <li key={idx} className="flex justify-between text-sm">
                                        <span className="text-text-muted">{item.label}</span>
                                        <span className="font-mono bg-white/5 px-2 rounded">{item.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-xs text-text-muted text-center">
                    Values are estimates based on global averages (UK Govt GHG Conversion Factors / Poore & Nemecek 2018).
                </div>
            </motion.div>
        </div>
    );
};

export default EmissionFactorsModal;
