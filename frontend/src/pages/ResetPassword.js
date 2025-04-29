import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const response = await fetch(`/api/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await response.json();
      if (response.ok) {
        setMsg('Password reset successful! You can now log in.');
      } else {
        setMsg(data.error || 'Password reset failed.');
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
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 16 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }} disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {msg && <div style={{ marginTop: 16 }}>{msg}</div>}
    </div>
  );
}

export default ResetPassword;
