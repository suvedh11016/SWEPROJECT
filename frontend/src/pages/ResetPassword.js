// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function ForgotPassword() {
//   const [username, setUsername] = useState('');
//   const [msg, setMsg] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch('/api/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username })
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMsg('OTP sent! Redirecting...');
//         setTimeout(() => {
//           navigate(`/reset-password?username=${encodeURIComponent(username)}`);
//         }, 1500);
//       } else {
//         setMsg(data.error || 'Failed to send OTP.');
//       }
//     } catch {
//       setMsg('Network error.');
//     }
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
//       <h2>Reset Password</h2>
//       <input
//         value={username}
//         disabled
//         style={{ width: '100%', padding: 8, marginBottom: 16, background: '#f0f0f0' }}
//       />
//       <input
//         value={otp}
//         onChange={e => setOtp(e.target.value)}
//         placeholder="OTP"
//         required
//         style={{ width: '100%', padding: 8, marginBottom: 16 }}
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder="New Password"
//         required
//         style={{ width: '100%', padding: 8, marginBottom: 16 }}
//       />
//       <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
//         {loading ? 'Resetting...' : 'Reset Password'}
//       </button>
//       {msg && <div style={{ marginTop: 16 }}>{msg}</div>}
//     </form>
//   );
// }

// export default ResetPassword;

import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username') || '';
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          otp: otp.trim(),
          password
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMsg('Password reset! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setMsg(data.error || 'Reset failed.');
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
            }}>Reset Password</h2>
            <p style={{ 
              fontSize: '16px', 
              color: '#6b7280' 
            }}>Enter the OTP sent to your email and set a new password</p>
          </div>
          
          <form onSubmit={handleSubmit}>
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
              <input
                type="text"
                value={username}
                disabled
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid #d1d5db', 
                  fontSize: '16px', 
                  backgroundColor: '#f0f0f0', 
                  marginBottom: '16px' 
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '16px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid #d1d5db', 
                  fontSize: '16px', 
                  marginBottom: '16px' 
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '16px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid #d1d5db', 
                  fontSize: '16px', 
                  marginBottom: '16px' 
                }}
              />
            </div>
            
            <button
              type="submit"
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
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
          
          {msg && (
            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              borderRadius: '8px', 
              backgroundColor: msg.includes('Password reset') ? '#f0fdf4' : '#fef2f2', 
              color: msg.includes('Password reset') ? '#166534' : '#b91c1c', 
              border: `1px solid ${msg.includes('Password reset') ? '#bbf7d0' : '#fecaca'}` 
            }}>
              {msg}
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              onClick={() => navigate('/')}
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
          background: 'linear-gradient(to right, #4b5563, rgb(20, 66, 136), #4b5563)' 
        }}></div>
      </div>
    </div>
  );
}

export default ResetPassword;
