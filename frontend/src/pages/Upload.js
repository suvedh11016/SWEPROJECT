import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './upload.css';
import { motion, AnimatePresence } from 'framer-motion';

function Upload() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    condition: '',
    from_date: '',
    to_date: '',
    upload_item: ''  // This will store the Google Drive link
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDoraemon, setShowDoraemon] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => setShowDoraemon(false), 3000);
      return () => clearTimeout(timer);
    }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage('');
  };

  // Handle upload form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Basic validation
    if (!form.title || !form.from_date || !form.to_date || !form.upload_item) {
      setMessage('Please fill in all fields.');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('authToken');
    console.log("Token:", token); 
    if(!token) {
      console.log("No token found");
    }

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          condition: form.condition,
          from_date: form.from_date,
          to_date: form.to_date,
          upload_item: form.upload_item  // Send the Google Drive link
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Upload successful!');
        setForm({
          title: '',
          description: '',
          condition: '',
          from_date: '',
          to_date: '',
          upload_item: ''
        });
      } else {
        setMessage(data.error || 'Upload failed.');
      }
    } catch (err) {
      setMessage('Network error. Is the backend running?');
    }
    setLoading(false);
  };

  return (
    
    <div className="upload-form-container">
      <div className="top-bar">
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate('/dashboard')}>Home</button>
          <button className="nav-button" onClick={() => navigate('/upload-physical')}>Upload</button>
          <button className="nav-button" onClick={() => navigate('/borrow-physical')}>Borrow</button>
          <button className="nav-button" onClick={() => navigate('/return')}>Return</button>
        </div>
        <div className="profile-button">
          <button className="nav-button" onClick={() => navigate('/profile')}>Profile</button>
        </div>
      </div>
      <AnimatePresence>
                {showDoraemon && (
                  <motion.div
                    className="doraemon-box"
                    initial={{ x: '100%' }}
                    animate={{ x: '0%' }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 100, damping: 12 }}
                  >
                    <img src="/upload.png" alt="Doraemon" className="doraemon-img" />
                    <p className="doraemon-hi">You can Upload and add Details about the Item</p>
                  </motion.div>
                )}
              </AnimatePresence>
      <h2>Upload Physical Resource</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required className="form-input"
          />
        </div>
       
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Condition</label>
          <input
            type="text"
            name="condition"
            value={form.condition}
            onChange={handleChange}
             className="form-input"
          />
        </div>
        <div className="form-group">
          <label>From Date</label>
          <input
            type="date"
            name="from_date"
            value={form.from_date}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>To Date</label>
          <input
            type="date"
            name="to_date"
            value={form.to_date}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Google Drive Link</label>
          <input
            type="url"
            name="upload_item"
            value={form.upload_item}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Paste the Google Drive link here"
          />
        </div>
        <button
          type="submit"
         
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        {message && (
          <div style={{ marginTop: 16, color: message.startsWith('Upload successful') ? 'green' : 'red' }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Upload;
