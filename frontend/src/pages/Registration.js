import React, { useState } from 'react';

function Registration() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage('');
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Basic validation
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! You can now log in.');
        setForm({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        setMessage(data.error || 'Registration failed.');
      }
    } catch (err) {
      setMessage('Network error. Is the backend running?');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: 10,
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 4
          }}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        {message && (
          <div style={{ marginTop: 16, color: message.startsWith('Registration successful') ? 'green' : 'red' }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Registration;
