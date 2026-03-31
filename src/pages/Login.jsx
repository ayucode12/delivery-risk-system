import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { Package, ShieldCheck } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    phone_number: '',
    country_code: '+91',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        phone_number: `${formData.country_code}${formData.phone_number}`,
        password: formData.password
      };
      const response = await api.post('/login', payload);
      onLogin(response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
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
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Login to your Delivery Protect Plus dashboard
          </p>
        </div>

        {error && (
          <div className="status-badge danger" style={{ display: 'block', padding: '12px', textAlign: 'center', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={formData.password}
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            New to Delivery Protect Plus?{' '}
            <Link to="/register" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontWeight: 'bold' }}>
              Register here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
