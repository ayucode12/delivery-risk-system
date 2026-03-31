import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Package, ShieldCheck } from 'lucide-react';

const Registration = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    country_code: '+91',
    password: '',
    vehicle_type: 'Two-Wheeler',
    city: 'Mumbai',
    insurance_type: 'Basic'
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
      const payload = {
        ...formData,
        phone_number: `${formData.country_code}${formData.phone_number}`
      };
      const response = await api.post('/register', payload);
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
            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                id="country_code" 
                name="country_code" 
                className="input-field" 
                style={{ width: '35%' }}
                value={formData.country_code}
                onChange={handleChange}
              >
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (AU)</option>
              </select>
              <input 
                type="tel" 
                id="phone_number" 
                name="phone_number" 
                className="input-field" 
                style={{ width: '65%' }}
                placeholder="Ex: 9876543210"
                value={formData.phone_number}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if(val.length <= 10) {
                    setFormData({ ...formData, phone_number: val });
                  }
                }}
                pattern="[0-9]{10}"
                title="Please enter exactly 10 digits"
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="input-field" 
              placeholder="Enter a secure password"
              value={formData.password}
              onChange={handleChange}
              required 
              minLength="6"
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
            <select 
              id="city" 
              name="city" 
              className="input-field"
              value={formData.city}
              onChange={handleChange}
              required 
            >
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
              <option value="Ahmedabad">Ahmedabad</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="insurance_type">Insurance Type</label>
            <select 
              id="insurance_type" 
              name="insurance_type" 
              className="input-field"
              value={formData.insurance_type}
              onChange={handleChange}
            >
              <option value="Basic">Basic (Standard Coverage)</option>
              <option value="Premium">Premium (+ Weather Protection)</option>
              <option value="Comprehensive">Comprehensive (Full Risk Coverage)</option>
            </select>
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

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Already registered?{' '}
            <Link to="/login" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontWeight: 'bold' }}>
              Login here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Registration;
