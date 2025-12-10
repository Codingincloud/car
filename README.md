# CarbonCut - Personal Carbon Footprint Tracker

CarbonCut is a modern, interactive web application designed to help users estimate and track their daily carbon footprint. By inputting daily activities related to transport, food, and energy consumption, users receive instant feedback on their environmental impact along with AI-driven recommendations to reduce it.

## Project Goal
The primary goal of CarbonCut is to raise awareness about individual carbon footprints. It provides a simple, user-friendly interface to quantify daily emissions and offers actionable insights to encourage sustainable lifestyle choices.

## Tech Stack
This project is built using a modern frontend stack:
- **React**: For building the user interface.
- **Vite**: For fast development and optimized production builds.
- **Tailwind CSS**: For utility-first, responsive styling.
- **Recharts**: For visualizing data with interactive charts.
- **Lucide React**: For beautiful, consistent icons.

## Calculation Logic
CarbonCut estimates CO₂ emissions based on user inputs using the following multipliers:

### 1. Transport
- **Car**: 0.2 kg CO₂e per km
- **Public Transport**: 0.05 kg CO₂e per km
- *Formula*: `Distance (km) × Multiplier`

### 2. Food
- **Meat-heavy Diet**: 7 kg CO₂e per day
- **Vegetarian Diet**: 3 kg CO₂e per day
- *Formula*: `Fixed daily value based on diet type`

### 3. Home Energy
- **Low Usage**: 3 kg CO₂e per day
- **Medium Usage**: 6 kg CO₂e per day
- **High Usage**: 12 kg CO₂e per day
- *Formula*: `Fixed daily value based on usage level`

### Impact Rating
- **Low Impact**: < 5 kg CO₂e
- **Moderate Impact**: 5 - 15 kg CO₂e
- **High Impact**: > 15 kg CO₂e

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (Node Package Manager)

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/Codingincloud/car.git
   cd carboncut
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application locally**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or the port shown in your terminal).

4. **Build for production**
   ```bash
   npm run build
   ```

## License
This project is open-source and available under the MIT License.
