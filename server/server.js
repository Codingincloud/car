import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateToken, authMiddleware } from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Data file paths
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const CARBON_FILE = path.join(__dirname, 'data', 'carbon-data.json');

app.use(cors());
app.use(express.json());

// Helper functions for file-based database
const readJSON = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeJSON = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// ============================================
// AUTH ENDPOINTS
// ============================================

// Register new user
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        const users = readJSON(USERS_FILE);

        // Check if email already exists
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = {
            id: uuidv4(),
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            level: 1,
            totalPoints: 0
        };

        users.push(newUser);
        writeJSON(USERS_FILE, users);

        // Generate token
        const token = generateToken(newUser.id);

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                level: newUser.level,
                totalPoints: newUser.totalPoints
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const users = readJSON(USERS_FILE);
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user.id);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                level: user.level,
                totalPoints: user.totalPoints
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// Get current user
app.get('/api/auth/me', authMiddleware, (req, res) => {
    try {
        const users = readJSON(USERS_FILE);
        const user = users.find(u => u.id === req.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                level: user.level,
                totalPoints: user.totalPoints,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ============================================
// CARBON DATA ENDPOINTS
// ============================================

// Save carbon entry
app.post('/api/carbon/save', authMiddleware, (req, res) => {
    try {
        const { breakdown, total, date } = req.body;
        const userId = req.userId;

        if (!breakdown || total === undefined) {
            return res.status(400).json({ error: 'Breakdown and total are required' });
        }

        const carbonData = readJSON(CARBON_FILE);
        const entryDate = date || new Date().toISOString().split('T')[0];

        // Check if entry for this date already exists
        const existingIndex = carbonData.findIndex(
            entry => entry.userId === userId && entry.date === entryDate
        );

        const newEntry = {
            id: uuidv4(),
            userId,
            date: entryDate,
            breakdown,
            total,
            createdAt: new Date().toISOString()
        };

        if (existingIndex >= 0) {
            carbonData[existingIndex] = { ...carbonData[existingIndex], ...newEntry };
        } else {
            carbonData.push(newEntry);
        }

        writeJSON(CARBON_FILE, carbonData);

        // Update user points
        const users = readJSON(USERS_FILE);
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex >= 0) {
            // Award points based on low carbon footprint
            const points = total < 5 ? 50 : total < 10 ? 30 : total < 15 ? 10 : 5;
            users[userIndex].totalPoints = (users[userIndex].totalPoints || 0) + points;
            users[userIndex].level = Math.floor(users[userIndex].totalPoints / 100) + 1;
            writeJSON(USERS_FILE, users);
        }

        res.json({
            message: 'Carbon entry saved',
            entry: newEntry
        });
    } catch (error) {
        console.error('Save carbon error:', error);
        res.status(500).json({ error: 'Server error saving carbon data' });
    }
});

// Get user's carbon history
app.get('/api/carbon/history', authMiddleware, (req, res) => {
    try {
        const carbonData = readJSON(CARBON_FILE);
        const userHistory = carbonData
            .filter(entry => entry.userId === req.userId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json({ history: userHistory });
    } catch (error) {
        console.error('Get history error:', error);
        res.status(500).json({ error: 'Server error fetching history' });
    }
});

// Get user stats
app.get('/api/carbon/stats', authMiddleware, (req, res) => {
    try {
        const carbonData = readJSON(CARBON_FILE);
        const userHistory = carbonData.filter(entry => entry.userId === req.userId);

        if (userHistory.length === 0) {
            return res.json({
                totalEntries: 0,
                averageFootprint: 0,
                bestDay: null,
                streak: 0
            });
        }

        const totals = userHistory.map(e => e.total);
        const averageFootprint = totals.reduce((a, b) => a + b, 0) / totals.length;
        const bestDay = userHistory.reduce((best, curr) =>
            curr.total < best.total ? curr : best
        );

        // Calculate streak
        const sortedByDate = userHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
        let streak = 0;
        for (let i = 0; i < sortedByDate.length - 1; i++) {
            if (sortedByDate[i].total < sortedByDate[i + 1].total) {
                streak++;
            } else {
                break;
            }
        }

        res.json({
            totalEntries: userHistory.length,
            averageFootprint: averageFootprint.toFixed(2),
            bestDay,
            streak
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ error: 'Server error fetching stats' });
    }
});

// ============================================
// CARBON INTENSITY (Existing endpoint)
// ============================================

const seededRandom = (seed) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    const x = Math.sin(hash) * 10000;
    return x - Math.floor(x);
};

app.get('/api/carbon-intensity', (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    setTimeout(() => {
        const seed = city.toLowerCase().trim();
        const cleanPercentage = Math.floor(seededRandom(seed) * 60) + 20;
        const peakTime = Math.floor(seededRandom(seed + 'time') * 12) + 8;
        const savings = Math.floor(seededRandom(seed + 'savings') * 20) + 10;

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

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🌿 CarbonCut Server running on http://localhost:${PORT}`);
});
