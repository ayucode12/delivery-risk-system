import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { User, IndianRupee, Activity, ShieldCheck, MapPin, AlertTriangle, LogOut } from 'lucide-react';
import SimulationPanel from '../components/SimulationPanel';

const Dashboard = ({ user: initialUser, onLogout }) => {
  const [data, setData] = useState({ user: initialUser, policy: null, claims: [] });
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const res = await api.get(`/user/${initialUser.id}`);
      setData(res.data);
    } catch (err) {
      console.error("Failed to load user data", err);
      if (err.response && err.response.status === 404) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();

    // Zero-Touch UI Polling: Silently ping auto-claim every 10 seconds
    const claimInterval = setInterval(async () => {
      try {
        const res = await api.post(`/auto-claim/${initialUser.id}`);
        if (res.status === 201) {
          // Success triggered by backend logic
          alert(`⚡ ZERO-TOUCH ACTIVATED: ${res.data.message}\nPayout: ₹${res.data.claim.amount} for ${res.data.claim.reason}`);
          fetchUserData(); // refresh dashboard
        }
      } catch (err) {
        // Silently ignore 400s (conditions not met or claim exists)
      }
    }, 10000);

    return () => clearInterval(claimInterval);
  }, [initialUser.id]);

  if (loading || !data.policy) {
    return <div className="container flex-center" style={{ minHeight: '100vh' }}>Loading Dashboard...</div>;
  }

  const { user, policy, claims } = data;

  // Render Status
  let statusBadge = <span className="status-badge success">Safe / Protected</span>;
  if (user.fraud_score > 70) {
    statusBadge = <span className="status-badge danger">Suspicious Activity</span>;
  } else if (user.risk_active) {
    statusBadge = <span className="status-badge warning">Risk Condition Active</span>;
  }

  return (
    <div className="container animate-slide-up" style={{ padding: '2rem' }}>
      
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="title-gradient" style={{ fontSize: '2rem' }}>Delivery Protect Plus</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user.name}</p>
        </div>
        <button onClick={onLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="grid-cols-2">
        {/* Left Column: Worker Identity & Policy details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} color="var(--brand-primary)" />
              Worker Profile
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(100px, max-content) 1fr', gap: '12px', color: 'var(--text-secondary)' }}>
              <div><strong>Name:</strong></div> <div style={{ color: 'white' }}>{user.name}</div>
              <div><strong>Phone:</strong></div> <div style={{ color: 'white' }}>{user.phone_number}</div>
              <div><strong>Vehicle:</strong></div> <div style={{ color: 'white' }}>{user.vehicle_type}</div>
              <div><strong>City:</strong></div> <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'white' }}><MapPin size={14}/> {user.city}</div>
              <div><strong>System Status:</strong></div> <div>{statusBadge}</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', background: 'var(--brand-gradient)', color: 'white' }}>
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
              <ShieldCheck size={24} color="white" />
              Active Policy
            </h3>
            <div className="flex-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '16px', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9, color: 'white' }}>Policy Type</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>{policy.policy_type} Tier</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.9, color: 'white' }}>Active Coverage</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>₹{policy.weekly_coverage} ({policy.coverage_hours} hrs/wk)</div>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
              <div className="flex-between">
                <div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.9, color: 'white' }}>Current Dynamic Premium</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IndianRupee size={24}/>{policy.current_premium} 
                    <span style={{ fontSize: '1rem', fontWeight: 400 }}>/week</span>
                  </div>
                </div>
                {policy.current_premium > policy.base_premium && <AlertTriangle size={36} color="var(--accent-warning)" />}
              </div>
              
              <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'white', opacity: 0.9 }}>
                * Base premium: ₹{policy.base_premium}
              </div>

              {policy.modifiers && policy.modifiers.length > 0 && (
                <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--brand-primary)', display: 'block', marginBottom: '8px' }}>Active AI Modifiers</strong>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem' }}>
                    {policy.modifiers.map((mod, idx) => (
                      <li key={idx} style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ShieldCheck size={14} color="var(--accent-success)" />
                        {mod}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Data & Simulation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} color="var(--brand-secondary)" />
              Real-time Telemetry
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Weather Condition</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: user.weather_condition === 'heavy_rain' ? 'var(--accent-warning)' : 'var(--text-primary)', textTransform: 'capitalize' }}>
                  {user.weather_condition.replace('_', ' ')}
                </div>
              </div>
              
              <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Fraud Score</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: user.fraud_score > 70 ? 'var(--accent-danger)' : 'var(--accent-success)' }}>
                  {user.fraud_score} / 100
                </div>
              </div>

               <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Movement Status</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: user.inactivity_flag ? 'var(--accent-warning)' : 'var(--accent-success)' }}>
                  {user.inactivity_flag ? 'Inactive' : 'Active'}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Safe Zone Area: <strong style={{color: 'white'}}>{user.is_safe_area ? 'Active' : 'Inactive'}</strong></div>
            </div>

          </div>

          <SimulationPanel userId={user.id} refreshData={fetchUserData} />

          {/* Claims History */}
          <div className="glass-panel" style={{ padding: '24px' }}>
             <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Claims Processing
            </h3>
            {claims.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No claims triggered yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {claims.map(claim => (
                  <div key={claim.id} style={{ background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid var(--accent-success)' }}>
                    <div className="flex-between">
                      <strong>Auto-Claim #{claim.id}</strong>
                      <span className="status-badge success">{claim.status}</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                      Reason: {claim.reason}
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--brand-primary)', marginTop: '8px' }}>
                      Payout: ₹{claim.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
