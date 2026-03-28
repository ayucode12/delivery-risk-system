const express = require('express');
const router = express.Router();

const { registerUser, getUser, getAllUsers } = require('../controllers/userController');
const { getPolicy } = require('../controllers/policyController');
const { triggerRain, triggerInactivity, triggerRouteDeviation, triggerSafeArea } = require('../controllers/triggerController');
const { processAutoClaim, getClaims } = require('../controllers/claimController');

// User Routes
router.post('/register', registerUser);
router.get('/user/:id', getUser);
router.get('/users', getAllUsers);

// Policy & Premium Routes
router.get('/policy/:id', getPolicy);

// Triggers (Demo APIs)
router.post('/trigger/rain/:id', triggerRain);
router.post('/trigger/inactivity/:id', triggerInactivity);
router.post('/trigger/deviation/:id', triggerRouteDeviation);
router.post('/trigger/safe-area/:id', triggerSafeArea);

// Claims
router.post('/auto-claim/:id', processAutoClaim);
router.get('/claims/:id', getClaims);

module.exports = router;
