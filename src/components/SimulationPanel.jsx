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

  // The autoClaim manual button is removed because the Dashboard now polls automatically 
  // every 10 seconds to simulate a true zero-touch async claims backend!

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
          <strong>Mock OpenWeather API</strong>
          <span style={{ fontSize: '0.8rem' }}>Trigger Severe Rain</span>
        </button>

        <button className="btn-secondary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }} onClick={() => triggerSimulation('inactivity')}>
          <PauseCircle size={32} color="var(--accent-warning)" />
          <strong>Mock Telematics API</strong>
          <span style={{ fontSize: '0.8rem' }}>Trigger Inactivity Flag</span>
        </button>

        <button className="btn-danger" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }} onClick={() => triggerSimulation('deviation')}>
          <MapPinOff size={32} color="var(--accent-danger)" />
          <strong>Mock Google Maps API</strong>
          <span style={{ fontSize: '0.8rem' }}>Route Deviation (Fraud)</span>
        </button>
        
        <button className="btn-primary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }} onClick={() => triggerSimulation('safe-area')}>
          <BadgeCheck size={32} color="white" />
          <strong>Mock Civic Data API</strong>
          <span style={{ fontSize: '0.8rem' }}>Toggle Safe Zone</span>
        </button>
      </div>

      <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-glass)', textAlign: 'center' }}>
        <h4 style={{ marginBottom: '8px', color: 'var(--brand-primary)' }}>Live Zero-Touch Claims Enabled</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          This dashboard asynchronously polls the server core every 10 seconds via background workers. 
          If AI identifies disruptions crossing the risk threshold, payouts occur instantly with zero manual intervention.
        </p>
      </div>

    </div>
  );
};

export default SimulationPanel;
