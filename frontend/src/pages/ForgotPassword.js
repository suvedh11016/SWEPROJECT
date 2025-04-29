import React, { useState } from 'react';

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message); // "Reset link sent to your email."
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setMessage('Network error. Is the backend running?');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 16 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }} disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <div style={{ marginTop: 16 }}>{message}</div>}
    </div>
  );
}

export default ForgotPassword;
