import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShieldCheck, ArrowRight, UserPlus, LogIn } from 'lucide-react';

const Landing = () => {
  return (
    <div className="container flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="glass-panel animate-slide-up" style={{ width: '100%', maxWidth: '480px', padding: '3rem 2.5rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
            <Package size={48} color="var(--brand-primary)" />
            <ShieldCheck size={48} color="var(--brand-secondary)" />
          </div>
          <h1 className="title-gradient" style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
            Delivery Protect Plus
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.5' }}>
            Smart insurance and risk protection platform for modern delivery workers.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link 
            to="/register" 
            className="btn-primary" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '10px', 
              textDecoration: 'none',
              padding: '16px',
              fontSize: '1.1rem'
            }}
          >
            <UserPlus size={20} />
            Create an Account
            <ArrowRight size={20} style={{ marginLeft: 'auto' }} />
          </Link>
          
          <Link 
            to="/login" 
            className="btn-secondary" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '10px', 
              textDecoration: 'none',
              padding: '16px',
              fontSize: '1.1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'var(--brand-secondary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <LogIn size={20} />
            Login to Dashboard
            <ArrowRight size={20} style={{ marginLeft: 'auto' }} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Landing;
