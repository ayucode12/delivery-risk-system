# Delivery Risk & Premium Optimization System

We will build a full-stack system consisting of a React frontend and a Node.js (Express) backend. The system will demonstrate AI-driven logic for dynamic insurance premiums, fraud detection, and zero-touch claims for delivery workers.

## User Review Required

> [!IMPORTANT]
> To ensure the prototype works instantly without external database setup, I propose using an **in-memory data store** (simple JS arrays/maps on the server) for the hackathon demo as permitted in your prompt. If you would prefer connecting to a real MongoDB instance, please let me know and provide the connection string!
> 
> Also, as per my system guidelines, I will use **Vanilla CSS** to craft a premium, dynamic, and glassmorphism-inspired UI instead of TailwindCSS. Let me know if you would specifically prefer TailwindCSS.

## Proposed Changes

We will initialize a new Node project under `./backend` containing the REST APIs and in-memory datastore, and a Vite React app under `./frontend`.

### `backend/` Subsystem (Node.js + Express)
- **`package.json`**: Dependencies: express, cors, nodemon.
- **`server.js`**: Entry point for the Express app mapping routes and enabling CORS.
- **`store.js`**: In-memory mock database storing `users`, `policies`, and `claims`. Each time the server restarts, the database will be fresh, perfect for quick demo loops.
- **`controllers/userController.js`**: Handles user registration, assigns default insurance policies, and fetches user details.
- **`controllers/policyController.js`**: Implements the dynamic premium calculation logic (base premium, weather adjustments, safe area reductions, and route deviation fraud penalties).
- **`controllers/triggerController.js`**: APIs to simulate the automated triggers (Simulate Rain, Simulate Inactivity, Simulate Route Deviation), updating user state and fraud scores.
- **`controllers/claimController.js`**: Zero-touch claims system logic. Approves claims automatically based on the user's current risk parameters (e.g., severe weather + inactivity).
- **`routes/api.js`**: Maps all the above controller functions to `/api/*` REST endpoints.

---

### `frontend/` Subsystem (React + Vite)
- **`package.json`**: Generated via Vite. Dependencies: react, react-dom, react-router-dom, axios, lucide-react (for icons).
- **`src/index.css`**: The core design system. We will define a dark theme with glassmorphism utility classes, smooth gradients, engaging micro-animations, and modern typography (Google Fonts: Inter/Outfit). 
- **`src/App.jsx`**: Main router configuration wrapping our pages.
- **`src/pages/Registration.jsx`**: A premium registration form for delivery workers capturing Name, Phone Number, Vehicle Type, and City. Upon submission, redirects to the Dashboard.
- **`src/pages/Dashboard.jsx`**: The primary control panel displaying: Worker & default policy details (Rs 5000 coverage), Real-time Premium & Risk Score, Claim statuses.
- **`src/components/SimulationPanel.jsx`**: A dashboard component housing our demo-friendly triggers: "Simulate Heavy Rain" (Increases premium, makes risk active), "Simulate Route Deviation" (Increases fraud score/premium), "Simulate Inactivity", "Trigger Auto Claim".
- **`src/utils/api.js`**: Axios wrapper configured to point to the `http://localhost:5000/api` base URL.

## Open Questions

1. **Database:** Are you comfortable with the in-memory store for demo purposes, or do you have a specific MongoDB instance/URI you want to integrate with immediately?
2. **Ports:** The backend will run on port `5000` and frontend on `5173`. Does that sound acceptable?

## Verification Plan

### Automated Tests
- I will run the API server and React frontend locally.
- Check backend API responses internally making simulated standard curl commands.

### Manual Verification
- A visual demonstration will be recorded of the full registration flow, simulation of route deviations, real-time recalculation of the dynamic premium, and the zero-touch automated claim authorization.
