import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="top-bar">
      <button className="home-button" onClick={() => navigate('/dashboard')}>
          Home
        </button>
        <button className="profile-button" onClick={() => navigate('/profile')}>Profile</button > 
      </div>
      <div className="center-content">
        <div
          className="resource-card"
          onClick={() => navigate('/physical-resources')}
        >
          Physical Resource
        </div>
        <div className="resource-card">Digital Resource</div>
      </div>
    </div>
  );
};

export default Dashboard;
