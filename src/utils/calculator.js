
export const calculateFootprint = (data) => {
  // --- Transport Logic ---
  // Factors in kg CO2e per km
  const vehicleFactors = {
    car_gasoline: 0.192,
    car_diesel: 0.171,
    car_hybrid: 0.110,
    car_ev: 0.053, // Mostly grid mix dependency
    motorcycle: 0.103,
    bus: 0.105,
    train: 0.041,
    bicycle: 0,
    walk: 0,
  };

  const transportType = data.transport.type || 'car_gasoline';
  const km = parseFloat(data.transport.km) || 0;
  const transportEmissions = km * (vehicleFactors[transportType] || 0.192);

  // --- Food Logic ---
  // Factors in kg CO2e per day based on diet & frequency
  const dietFactors = {
    meat_heavy: 7.2, // ~100g+ meat/day
    average: 5.6,    // Moderate meat
    no_beef: 3.9,    // Poultry/fish only
    vegetarian: 2.9,
    vegan: 2.0,
  };

  const dietType = data.food.type || 'average';
  const foodEmissions = dietFactors[dietType];

  // --- Energy Logic ---
  // kWh * grid factor (global avg approx 0.475 kg/kWh, but varies wildy)
  // Simple approximation for daily house usage
  const energyUsageKwh = parseFloat(data.energy.kwh) || 0;
  const energySourceFactor = data.energy.source === 'renewable' ? 0.05 : 0.475;
  const energyEmissions = energyUsageKwh * energySourceFactor;

  const total = transportEmissions + foodEmissions + energyEmissions;

  return {
    total: parseFloat(total.toFixed(2)),
    breakdown: {
      transport: parseFloat(transportEmissions.toFixed(2)),
      food: parseFloat(foodEmissions.toFixed(2)),
      energy: parseFloat(energyEmissions.toFixed(2)),
    },
    timestamp: new Date().toISOString(),
  };
};

export const getRating = (totalCo2) => {
  if (totalCo2 < 5) return { label: 'Eco Warrior', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
  if (totalCo2 < 10) return { label: 'Conscious Citizen', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
  if (totalCo2 < 20) return { label: 'Average Consumer', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
  return { label: 'High Emitter', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' };
};
