import React from 'react';
import './Return.css';
import { useNavigate } from 'react-router-dom';

const Return = () => {
  const navigate = useNavigate();

  return (
    <div className="return-page">
      {/* Top Navigation Bar */}
      <div className="top-bar">
        <div className="nav-buttons">
        <button className="nav-button" onClick={() => navigate('/dashboard')}>Home</button>
        <button className="nav-button" onClick={() => navigate('/upload-physical')}>Upload</button>
          <button className="nav-button" onClick={() => navigate('/borrow-physical')}>Borrow</button>
          <button className="nav-button" onClick={() => navigate('/return-physical')}>Return</button>
        </div>
        <div className="profile-button">
          <button className="nav-button" onClick={() => navigate('/profile')}>Profile</button>
        </div>
      </div>

      {/* Return Section */}
      <div className="outer-return-box">
        <h2 className="return-heading">Return Section</h2>
        <div className="return-container">
          {/* <div className="return-box">Taken</div>
          <div className="return-box">Given</div> */}
           <button onClick={() => navigate('/takenph')} className="return-box">Taken</button>
           <button onClick={() => navigate('/givenph')} className="return-box">Given</button>
        </div>
      </div>
    </div>
  );
};

export default Return;
