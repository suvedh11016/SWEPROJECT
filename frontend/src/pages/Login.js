import React, { useState } from 'react';

function Login() {
  const [isExistingUser, setIsExistingUser] = useState(true);

  // Login state
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginMsg, setLoginMsg] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Registration state
  const [regData, setRegData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [regMsg, setRegMsg] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // Handle login input
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setLoginMsg('');
  };

  // Handle registration input
  const handleRegChange = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
    setRegMsg('');
  };

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginMsg('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (response.ok) {
        setLoginMsg('Login successful! Token: ' + data.access_token);
        // Optionally store token: localStorage.setItem('access_token', data.access_token);
      } else {
        setLoginMsg(data.error || 'Login failed.');
      }
    } catch (err) {
      setLoginMsg('Network error. Is the backend running?');
    }
    setLoginLoading(false);
  };

  // Handle registration submit
  const handleRegSubmit = async (e) => {
    e.preventDefault();
    setRegMsg('');
    if (!regData.username || !regData.email || !regData.password || !regData.confirmPassword) {
      setRegMsg('Please fill in all fields.');
      return;
    }
    if (regData.password !== regData.confirmPassword) {
      setRegMsg('Passwords do not match.');
      return;
    }
    setRegLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: regData.username,
          email: regData.email,
          password: regData.password
        })
      });
      const data = await response.json();
      if (response.ok) {
        setRegMsg('Registration successful! You can now log in.');
        setRegData({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        setRegMsg(data.error || 'Registration failed.');
      }
    } catch (err) {
      setRegMsg('Network error. Is the backend running?');
    }
    setRegLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <button
          onClick={() => setIsExistingUser(true)}
          style={{
            padding: '10px 20px',
            marginRight: 8,
            background: isExistingUser ? '#007bff' : '#f0f0f0',
            color: isExistingUser ? '#fff' : '#333',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Existing User
        </button>
        <button
          onClick={() => setIsExistingUser(false)}
          style={{
            padding: '10px 20px',
            background: !isExistingUser ? '#007bff' : '#f0f0f0',
            color: !isExistingUser ? '#fff' : '#333',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          New User
        </button>
      </div>

      {isExistingUser ? (
        <form onSubmit={handleLoginSubmit}>
          <h2>Login</h2>
          <div style={{ marginBottom: 16 }}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
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
            disabled={loginLoading}
          >
            {loginLoading ? 'Logging in...' : 'Login'}
          </button>
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <a href="/forgot-password" style={{ color: '#007bff', textDecoration: 'underline' }}>
              Forgot password?
            </a>

          </div>
          {loginMsg && (
            <div style={{ marginTop: 16, color: loginMsg.startsWith('Login successful') ? 'green' : 'red' }}>
              {loginMsg}
            </div>
          )}
        </form>
      ) : (
        <form onSubmit={handleRegSubmit}>
          <h2>Register</h2>
          <div style={{ marginBottom: 16 }}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={regData.username}
              onChange={handleRegChange}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={regData.email}
              onChange={handleRegChange}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={regData.password}
              onChange={handleRegChange}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={regData.confirmPassword}
              onChange={handleRegChange}
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
            disabled={regLoading}
          >
            {regLoading ? 'Registering...' : 'Register'}
          </button>
          {regMsg && (
            <div style={{ marginTop: 16, color: regMsg.startsWith('Registration successful') ? 'green' : 'red' }}>
              {regMsg}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default Login;
