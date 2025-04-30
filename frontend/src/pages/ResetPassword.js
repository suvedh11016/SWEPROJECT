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
          otp: otp.trim(),  // Trim whitespace
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
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          disabled
          style={{ width: '100%', padding: 8, marginBottom: 16, background: '#f0f0f0' }}
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 16 }}
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 16 }}
        />
        <button
          type="submit"
          style={{ width: '100%', padding: 10, background: '#007bff', color: 'white', border: 'none', borderRadius: 4 }}
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        {msg && <div style={{ marginTop: 16, color: msg.includes('success') ? 'green' : 'red' }}>{msg}</div>}
      </form>
    </div>
  );
}

export default ResetPassword;
