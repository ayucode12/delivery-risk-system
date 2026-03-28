const store = require('../store');
const { recalculatePremium } = require('./policyController');

const triggerRain = (req, res) => {
    const { id } = req.params;
    const user = store.users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.weather_condition = 'heavy_rain';
    user.risk_active = true;

    const policy = recalculatePremium(id);
    res.json({ message: "Heavy rain simulated.", user, policy });
};

const triggerInactivity = (req, res) => {
    const { id } = req.params;
    const user = store.users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.inactivity_flag = true;
    user.risk_active = true;

    res.json({ message: "Inactivity flag activated.", user });
};

const triggerRouteDeviation = (req, res) => {
    const { id } = req.params;
    const user = store.users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.fraud_score += 40; // High enough to trigger fraud rules eventually
    const policy = recalculatePremium(id);

    res.json({ message: "Route deviation detected. Fraud score increased.", user, policy });
};

const triggerSafeArea = (req, res) => {
    const { id } = req.params;
    const user = store.users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.is_safe_area = !user.is_safe_area; // Toggle it
    // Reset flags if safe area
    if (user.is_safe_area) {
        user.weather_condition = 'normal';
        user.risk_active = false;
        user.inactivity_flag = false;
        user.fraud_score = 0;
    }

    const policy = recalculatePremium(id);

    res.json({ message: `Safe area toggled to ${user.is_safe_area}`, user, policy });
};

module.exports = {
    triggerRain,
    triggerInactivity,
    triggerRouteDeviation,
    triggerSafeArea
};
