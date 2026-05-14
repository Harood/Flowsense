# FlowSense - Water Usage Anomaly Detection System

FlowSense is an intelligent water monitoring and leak detection platform that uses machine learning to identify anomalous water usage patterns in real-time. The system combines a modern React-based frontend dashboard with a sophisticated ML-powered backend to detect water leaks and unusual consumption patterns.

## Features

- **🔍 Real-time Anomaly Detection**: Uses Isolation Forest algorithm to identify unusual water consumption patterns
- **📊 Interactive Dashboard**: Beautiful, responsive UI built with React and Tailwind CSS
- **🏠 Multi-sensor Monitoring**: Tracks water usage across multiple household zones:
  - Master & Common Bathrooms
  - Laundry Room
  - Kitchen
  - Garden
- **⚡ Smart Alerts**: AI-powered severity classification and sensor identification for detected anomalies
- **📈 Historical Analytics**: Visualize water usage trends and patterns over time
- **🎯 Goal Tracking**: Set and monitor water conservation goals
- **⚙️ Customizable Settings**: Units, notifications, integrations, privacy controls, and more

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling and theming
- **Vite** - Build tool for fast development
- **Recharts** - Data visualization
- **React Router** - Client-side navigation
- **Radix UI** - Accessible component library
- **Material-UI** - Advanced UI components

### Backend & ML
- **Python** - Core language
- **scikit-learn** - Machine learning (Isolation Forest)
- **Pandas** - Data processing
- **NumPy** - Numerical computing

## Project Structure

```
Flowsense/
├── Frontend/                    # React frontend application
│   ├── src/
│   │   ├── app/               # Main application components
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # Radix UI primitives
│   │   │   ├── settings/     # Settings pages
│   │   │   ├── onboarding/   # Onboarding flow
│   │   │   └── figma/        # Figma integration
│   │   └── styles/           # Global styles and themes
│   ├── vite.config.ts        # Vite configuration
│   └── package.json
├── ml_models/                 # ML model training
│   └── anomaly_detection.py   # Isolation Forest trainer
└── Backend/                   # Backend API & data
    └── data/                  # Trained models & alerts
```

## Getting Started

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.9+ (for ML models)
- npm or pnpm (package managers)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start development server:
```bash
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173`

4. Build for production:
```bash
npm run build
```

### ML Model Setup

1. Navigate to the ml_models directory:
```bash
cd ml_models
```

2. Install Python dependencies:
```bash
pip install pandas numpy scikit-learn joblib
```

3. Prepare your water usage data:
- Place CSV file at `ml_models/data/water_data_hourly.csv`
- Required columns: `datetime`, `bathroom1_L`, `bathroom2_L`, `laundry_L`, `kitchen_L`, `garden_L`, `total_L`, `hour`, `is_anomaly`, `anomaly_sensor`, `severity`

4. Train the model:
```bash
python anomaly_detection.py
```

This will generate:
- `Backend/data/isolation_forest.pkl` - Trained model
- `Backend/data/scaler.pkl` - Feature scaler
- `Backend/data/alerts.json` - Detected anomalies

## How It Works

### Anomaly Detection Pipeline

1. **Data Loading**: Reads hourly water consumption data
2. **Feature Engineering**: Extracts 12 features including:
   - Raw sensor readings (volume per zone)
   - Peak hour indicators
   - Night usage detection
   - Consumption ratios per zone
3. **Model Training**: Isolation Forest algorithm with 0.4% contamination rate
4. **Detection**: Identifies anomalies with anomaly scores
5. **Alerting**: Classifies severity and identifies affected sensors

### Key Metrics

The model evaluates using:
- **Accuracy**: Overall correctness
- **Precision**: False positive rate
- **Recall**: Detection rate for actual anomalies
- **F1 Score**: Balanced performance metric

## Configuration

### Model Parameters
- **n_estimators**: 200 (isolation trees)
- **contamination**: 0.004 (0.4% expected anomaly rate)
- **max_samples**: auto (adaptive sampling)
- **random_state**: 42 (reproducibility)

### Adjusting Sensitivity
To detect fewer/more anomalies, modify the `CONTAMINATION` variable in `anomaly_detection.py`

## Frontend Features

### Dashboard
- Real-time water consumption visualization
- Anomaly indicators and alerts
- Consumption by zone breakdown
- Historical usage charts

### Settings
- **Security**: Password and authentication management
- **Notifications**: Alert preferences and thresholds
- **Units**: Switch between liters and gallons
- **Goals & Alerts**: Set consumption targets
- **Privacy**: Data collection preferences
- **Sensors**: Manage and name water sensors
- **Integrations**: Connect with external services

### Onboarding
- Guided setup for first-time users
- Sensor configuration
- Goal setting

## Model Performance

The Isolation Forest algorithm provides:
- **Fast inference** on new data
- **Unsupervised learning** (no labeled data needed for initial training)
- **Scalability** to large datasets
- **Robustness** to different water usage patterns

## Future Enhancements

- [ ] Real-time streaming data integration
- [ ] LSTM/GRU neural networks for improved detection
- [ ] Predictive maintenance alerts
- [ ] Mobile app
- [ ] Multi-building support
- [ ] Historical baseline comparison
- [ ] Automated reporting

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**FlowSense** - Detect leaks before they drain your wallet 💧
