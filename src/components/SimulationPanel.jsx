import React from 'react';
import api from '../utils/api';
import { CloudRainWind, PauseCircle, MapPinOff, ShieldAlert, BadgeCheck } from 'lucide-react';

const SimulationPanel = ({ userId, refreshData }) => {
  const triggerSimulation = async (endpoint) => {
    try {
      await api.post(`/trigger/${endpoint}/${userId}`);
      refreshData();
    } catch (error) {
      console.error('Trigger simulation failed', error);
    }
  };

  const autoClaim = async () => {
    try {
      await api.post(`/auto-claim/${userId}`);
      refreshData();
      alert("System simulated claims sweep! Check status.");
    } catch (error) {
      alert(error.response?.data?.error || "Claim error");
    }
  };

  return (
    <div className="glass-panel animate-slide-up" style={{ padding: '24px', animationDelay: '0.2s', marginTop: '24px' }}>
      <h3 style={{ marginBottom: '4px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ShieldAlert size={20} color="var(--brand-secondary)" />
        Risk Simulation Engine
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
        For Demonstration Purposes Only
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        
        <button className="btn-secondary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }} onClick={() => triggerSimulation('rain')}>
          <CloudRainWind size={32} color="var(--brand-primary)" />
          Simulate Heavy Rain
        </button>

        <button className="btn-secondary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }} onClick={() => triggerSimulation('inactivity')}>
          <PauseCircle size={32} color="var(--accent-warning)" />
          Simulate Inactivity
        </button>

        <button className="btn-danger" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }} onClick={() => triggerSimulation('deviation')}>
          <MapPinOff size={32} color="var(--accent-danger)" />
          Route Deviation (Fraud)
        </button>
        
        <button className="btn-primary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }} onClick={() => triggerSimulation('safe-area')}>
          <BadgeCheck size={32} color="white" />
          Toggle Safe Area
        </button>
      </div>

      <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-glass)' }}>
        <h4 style={{ marginBottom: '16px' }}>Zero-Touch Claims Trigger</h4>
        <button className="btn-primary" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', width: '100%' }} onClick={autoClaim}>
          Force System Claims Check Sweep
        </button>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '8px', textAlign: 'center' }}>
          Automatically approves claim if user is at high risk (Severe Weather or Inactive in Risk Zone).
        </p>
      </div>

    </div>
  );
};

export default SimulationPanel;
