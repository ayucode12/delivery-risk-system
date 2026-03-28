import React, { useState } from 'react';
import api from '../utils/api';
import { Package, ShieldCheck } from 'lucide-react';

const Registration = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    vehicle_type: 'Two-Wheeler',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/register', formData);
      onRegister(response.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="glass-panel animate-slide-up" style={{ width: '100%', maxWidth: '480px', padding: '2.5rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
            <Package size={36} color="var(--brand-primary)" />
            <ShieldCheck size={36} color="var(--brand-secondary)" />
          </div>
          <h1 className="title-gradient" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
            Delivery Protect Plus
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Smart insurance and risk protection platform for modern delivery workers.
          </p>
        </div>

        {error && (
          <div className="status-badge danger" style={{ display: 'block', padding: '12px', textAlign: 'center', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="input-field" 
              placeholder="Ex: John Doe"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input 
              type="tel" 
              id="phone_number" 
              name="phone_number" 
              className="input-field" 
              placeholder="Ex: 9876543210"
              value={formData.phone_number}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="vehicle_type">Vehicle Type</label>
            <select 
              id="vehicle_type" 
              name="vehicle_type" 
              className="input-field"
              value={formData.vehicle_type}
              onChange={handleChange}
            >
              <option value="Two-Wheeler">Two-Wheeler</option>
              <option value="Bicycle">Bicycle</option>
              <option value="Electric Scooter">Electric Scooter</option>
              <option value="Car">Car</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="city">City</label>
            <input 
              type="text" 
              id="city" 
              name="city" 
              className="input-field" 
              placeholder="Ex: Mumbai"
              value={formData.city}
              onChange={handleChange}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '1rem', fontSize: '1rem', padding: '14px' }}
            disabled={loading}
          >
            {loading ? 'Creating Account & Generating Policy...' : 'Register & Get Protected'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Registration;
