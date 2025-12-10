import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Deterministic random number generator based on string seed
const seededRandom = (seed) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    const x = Math.sin(hash) * 10000;
    return x - Math.floor(x);
};

app.get('/api/carbon-intensity', (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    // Simulate processing delay
    setTimeout(() => {
        const seed = city.toLowerCase().trim();
        const cleanPercentage = Math.floor(seededRandom(seed) * 60) + 20; // 20% to 80%
        const peakTime = Math.floor(seededRandom(seed + 'time') * 12) + 8; // 8 AM to 8 PM
        const savings = Math.floor(seededRandom(seed + 'savings') * 20) + 10; // 10% to 30%

        const insight = `Your city's grid is currently ${cleanPercentage}% clean. Try to run heavy appliances like your dishwasher or washing machine at ${peakTime > 12 ? peakTime - 12 + ' PM' : peakTime + ' AM'} when solar energy peaks to cut your emissions by ${savings}%.`;

        res.json({
            city,
            clean_percentage: cleanPercentage,
            insight,
            recommendations: [
                insight,
                "Consider installing a smart thermostat to optimize heating and cooling based on grid intensity.",
                "Look into community solar projects available in your area to support renewable energy."
            ]
        });
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
