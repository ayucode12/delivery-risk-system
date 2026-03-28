const store = require('../store');

// Recalculates premium based on current user risk markers
const recalculatePremium = (userId) => {
    const user = store.users.find(u => u.id === userId);
    const policy = store.policies.find(p => p.user_id === userId);

    if (!user || !policy) return null;

    let premium = policy.base_premium;
    let modifiers = [];
    let coverage_hours = 40; // Base weekly coverage hours

    // If rain = heavy -> System detects hazard
    if (user.weather_condition === 'heavy_rain') {
        premium += 20;
        coverage_hours += 5; // AI insight: Give them more coverage time when weather is bad
        modifiers.push("Severe Weather Risk Adjustment: +₹20");
        modifiers.push("Predictive Weather Bonus: +5 Coverage Hours");
    }

    // AI Insight: Historical safe zone from water-logging
    if (user.is_safe_area) {
        premium -= 2; // Strict ₹2 matching hackathon example
        modifiers.push("Historically Safe Zone (Water Logging): -₹2");
    }

    // If fraud_score > 70 -> Telematics deviation penalty
    if (user.fraud_score > 70) {
        premium += 30;
        modifiers.push("High Risk Telematics Anomaly: +₹30");
    }

    // Apply
    policy.current_premium = premium > 0 ? premium : 0;
    policy.coverage_hours = coverage_hours;
    policy.modifiers = modifiers;
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
