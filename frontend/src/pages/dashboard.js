// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './dashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="dashboard-container">
//       <div className="top-bar">
//       <button className="home-button" onClick={() => navigate('/dashboard')}>
//           Home
//         </button>
//         <button className="profile-button" onClick={() => navigate('/profile')}>
//           Profile
//         </button>
        
//       </div>
//       <div className="center-content">
//         <div
//           className="resource-card"
//           onClick={() => navigate('/physical-resources')}
//         >
//           Physical Resource
//         </div>
//         <div className="resource-card" 
//         onClick={() => navigate('/physical-resources')}>Digital Resource</div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { FaServer, FaCloud } from 'react-icons/fa';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <div className="logo">Campus Resource Sharing</div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate('/dashboard')}>
            Home
          </button>
          <button className="nav-button" onClick={() => navigate('/profile')}>
            Profile
          </button>
        </div>
      </div>
      <div className="welcome-section">
  <h1>Welcome back</h1>
  <p>Explore the resources or Upload the resource.</p>
</div>


      <div className="center-content">
        <div
          className="resource-card"
          onClick={() => navigate('/physical-resources')}
        >
          📦 Physical Resources
        </div>
        <div
          className="resource-card"
          onClick={() => navigate('/digital-resources')}
        >
          💻 Digital Resources
        </div>
      </div>
    </div>
  );
};

export default Dashboard;