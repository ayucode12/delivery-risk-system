const store = require('../store');

const { v4: uuidv4 } = require('crypto');
const generateId = () => Math.random().toString(36).substring(2, 10);

const processAutoClaim = (req, res) => {
    const { id } = req.params;
    const user = store.users.find(u => u.id === id);

    if (!user) return res.status(404).json({ error: "User not found" });

    // Check conditions for auto-claim
    const severeWeather = user.weather_condition === 'heavy_rain';
    const inactiveAtRisk = user.inactivity_flag === true && user.risk_active === true;
    
    // Check if user already has an active claim
    const existingClaim = store.claims.find(c => c.user_id === id && c.status === 'Approved');
    if (existingClaim) {
        return res.status(400).json({ error: "Active claim already exists", claim: existingClaim });
    }

    if (severeWeather || inactiveAtRisk) {
        // Generate Auto Claim
        const newClaim = {
            id: generateId(),
            user_id: user.id,
            status: 'Approved',
            amount: 1000,
            reason: severeWeather ? 'Severe Weather Hazard' : 'Inactivity at Risk Zone',
            timestamp: new Date().toISOString()
        };

        store.claims.push(newClaim);

        return res.status(201).json({ 
            message: "Auto-claim generated successfully.", 
            claim: newClaim 
        });
    }

    res.status(400).json({ error: "Conditions for auto-claim not met." });
};

const getClaims = (req, res) => {
    const { id } = req.params;
    const userClaims = store.claims.filter(c => c.user_id === id);
    res.json(userClaims);
};

module.exports = {
    processAutoClaim,
    getClaims
};
