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
//       <h2>Forgot Password</h2>
//       <input
//         value={username}
//         onChange={e => setUsername(e.target.value)}
//         placeholder="Username"
//         required
//         style={{ width: '100%', padding: 8, marginBottom: 16 }}
//       />
//       <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
//         {loading ? 'Sending...' : 'Send OTP'}
//       </button>
//       {msg && <div style={{ marginTop: 16 }}>{msg}</div>}
//     </form>
//   );
// }

// export default ForgotPassword;

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
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 16 }}
        />
        <button
          type="submit"
          style={{ width: '100%', padding: 10, background: '#007bff', color: 'white', border: 'none', borderRadius: 4 }}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
        {msg && <div style={{ marginTop: 16, color: msg.includes('OTP sent') ? 'green' : 'red' }}>{msg}</div>}
      </form>
    </div>
  );
}

export default ForgotPassword;
