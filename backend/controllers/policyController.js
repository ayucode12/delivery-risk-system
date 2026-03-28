const store = require('../store');

// Recalculates premium based on current user risk markers
const recalculatePremium = (userId) => {
    const user = store.users.find(u => u.id === userId);
    const policy = store.policies.find(p => p.user_id === userId);

    if (!user || !policy) return null;

    let premium = policy.base_premium;

    // Base = 100
    // If rain = heavy -> +20
    if (user.weather_condition === 'heavy_rain') {
        premium += 20;
    }

    // If safe area -> -10 (let's say we assume city "SafeCity" or risk_active = false means safe area)
    // For demo, let's explicitly add a safe_area boolean to user which we can toggle
    if (user.is_safe_area) {
        premium -= 10;
    }

    // If fraud_score > 70 -> +30
    if (user.fraud_score > 70) {
        premium += 30;
    }

    // Apply
    policy.current_premium = premium;
    policy.last_updated = new Date().toISOString();

    return policy;
};

const getPolicy = (req, res) => {
    const { id } = req.params; // User ID
    const policy = recalculatePremium(id);

    if (!policy) {
        return res.status(404).json({ error: "Policy not found for user" });
    }

    res.json({ policy });
};

module.exports = {
    recalculatePremium,
    getPolicy
};
