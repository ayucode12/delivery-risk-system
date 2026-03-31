const store = require('../store');
const { v4: uuidv4 } = require('crypto'); // Built in crypto

// Simple ID generator without UUID dependency for demo
const generateId = () => Math.random().toString(36).substring(2, 10);

const registerUser = (req, res) => {
    const { name, phone_number, vehicle_type, city, insurance_type } = req.body;

    if (!name || !phone_number || !vehicle_type || !city) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = store.users.find(u => u.phone_number === phone_number);
    if (existingUser) {
        return res.status(400).json({ error: "User already registered" });
    }

    const newUser = {
        id: generateId(),
        name,
        phone_number,
        vehicle_type,
        city,
        risk_active: false,
        fraud_score: 0,
        inactivity_flag: false,
        weather_condition: 'normal',
        registered_at: new Date().toISOString()
    };

    // Assign default policy
    const defaultPolicy = {
        id: generateId(),
        user_id: newUser.id,
        policy_type: insurance_type || 'Basic',
        weekly_coverage: 5000,
        coverage_hours: 40,
        base_premium: 100,
        current_premium: 100, // Dynamic, starts at base
        modifiers: [],
        last_updated: new Date().toISOString()
    };

    store.users.push(newUser);
    store.policies.push(defaultPolicy);

    res.status(201).json({ user: newUser, policy: defaultPolicy });
};

const getUser = (req, res) => {
    const { id } = req.params;
    const user = store.users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const policy = store.policies.find(p => p.user_id === id);
    // Find claims
    const userClaims = store.claims.filter(c => c.user_id === id);

    res.json({
        user,
        policy,
        claims: userClaims
    });
};

const getAllUsers = (req, res) => {
    res.json(store.users);
};

const loginUser = (req, res) => {
    const { phone_number } = req.body;

    if (!phone_number) {
        return res.status(400).json({ error: "Phone number is required" });
    }

    const user = store.users.find(u => u.phone_number === phone_number);
    if (!user) {
        return res.status(404).json({ error: "User not found. Please register first." });
    }

    const policy = store.policies.find(p => p.user_id === user.id);
    const userClaims = store.claims.filter(c => c.user_id === user.id);

    res.json({
        user,
        policy,
        claims: userClaims
    });
};

module.exports = {
    registerUser,
    getUser,
    getAllUsers,
    loginUser
};
