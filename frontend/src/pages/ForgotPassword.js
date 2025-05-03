import { nav } from 'framer-motion/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      const data = await response.json();
      if (response.ok) {
        setMsg('OTP sent! Redirecting...');
        setTimeout(() => {
          // window.location.href = /reset-password?username=${encodeURIComponent(username)};
          navigate(`/reset-password?username=${encodeURIComponent(username)}`);
        }, 1500);
      } else {
        setMsg(data.error || 'Failed to send OTP.');
      }
    } catch {
      setMsg('Network error.');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: 'white' 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '450px', 
        backgroundColor: '#f5f7fa', 
        borderRadius: '16px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
        overflow: 'hidden'
      }}>
        <div style={{ padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>Forgot Password</h2>
            <p style={{ 
              fontSize: '16px', 
              color: '#6b7280' 
            }}>Enter your username to receive an OTP</p>
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '16px', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px 40px 12px 16px', 
                  borderRadius: '8px', 
                  border: '1px solid #d1d5db', 
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                right: '12px', 
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '24px' }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '12px', 
                backgroundColor: '#374151', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '16px', 
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
          
          {msg && (
            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              borderRadius: '8px',
              backgroundColor: msg.includes('OTP sent') ? '#f0fdf4' : '#fef2f2',
              color: msg.includes('OTP sent') ? '#166534' : '#b91c1c',
              border: `1px solid ${msg.includes('OTP sent') ? '#bbf7d0' : '#fecaca'}`
            }}>
              {msg}
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#3b82f6', 
                fontSize: '16px', 
                fontWeight: '500',
                cursor: 'pointer' 
              }}
            >
              Back to Login
            </button>
          </div>
        </div>
        
        <div style={{ 
          height: '4px', 
          background: 'linear-gradient(to right, #4b5563,rgb(20, 66, 136), #4b5563)' 
        }}></div>
      </div>
    </div>
  );
}

export default ForgotPassword;