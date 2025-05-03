
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// // import { FaServer, FaCloud } from 'react-icons/fa';
// import './dashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="dashboard-container">
//       <div className="top-bar">
//         <div className="logo">Campus Resource Sharing</div>
//         <div className="nav-buttons">
//           <button className="nav-button" onClick={() => navigate('/dashboard')}>
//             Home
//           </button>
//           <button className="nav-button" onClick={() => navigate('/profile')}>
//             Profile
//           </button>
//         </div>
//       </div>
//       <div className="welcome-section">
//   <h1>Welcome back</h1>
//   <p>Explore the resources or Upload the resource.</p>
// </div>


//       <div className="center-content">
//         <div
//           className="resource-card"
//           onClick={() => navigate('/physical-resources')}
//         >
//           📦 Physical Resources
//         </div>
//         <div
//           className="resource-card"
//           onClick={() => navigate('/digital-resources')}
//         >
//           💻 Digital Resources
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import './dashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   return (
//     <motion.div
//       className="dashboard-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <motion.div
//         className="top-bar"
//         initial={{ y: -60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <motion.div className="logo" whileHover={{ scale: 1.05 }}>
//           Campus Resource Sharing
//         </motion.div>
//         <div className="nav-buttons">
//           <motion.button
//             className="nav-button"
//             onClick={() => navigate('/dashboard')}
//             whileTap={{ scale: 0.95 }}
//           >
//             Home
//           </motion.button>
//           <motion.button
//             className="nav-button"
//             onClick={() => navigate('/profile')}
//             whileTap={{ scale: 0.95 }}
//           >
//             Profile
//           </motion.button>
//         </div>
//       </motion.div>

//       <motion.div
//         className="welcome-section"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.6 }}
//       >
//         <h1>Welcome back</h1>
//         <p>Explore the resources or upload a new one.</p>
//       </motion.div>

//       <div className="center-content">
//         <motion.div
//           className="resource-card"
//           whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
//           onClick={() => navigate('/physical-resources')}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           📦 Physical Resources
//         </motion.div>
//         <motion.div
//           className="resource-card"
//           whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
//           onClick={() => navigate('/digital-resources')}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           💻 Digital Resources
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showDoraemon, setShowDoraemon] = useState(false);

  useEffect(() => {
    setShowDoraemon(true);
    const timer = setTimeout(() => {
      setShowDoraemon(false);
    }, 3000); // Show Doraemon for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Doraemon Animation */}
      {/* <AnimatePresence>
        {showDoraemon && (
          <motion.div
            className="doraemon-wrapper"
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <img src="/doraemon.png" alt="Doraemon" className="doraemon-img" />

            <p className="doraemon-hi">Hi there!</p>
          </motion.div>
        )}
      </AnimatePresence> */}
      <AnimatePresence>
  {showDoraemon && (
    <motion.div
      className="doraemon-wrapper"
      initial={{ x: 150, opacity: 0 }}  // Start just offscreen to the right
      animate={{ x: 0, opacity: 1 }}   // Slide in just a bit
      exit={{ x: 150, opacity: 0 }}    // Exit back to the right
      transition={{ duration: 1 }}
    >
      <img src="/doraemon.png" alt="Doraemon" className="doraemon-img" />
      <p className="doraemon-hi">Hi there!</p>
    </motion.div>
  )}
</AnimatePresence>


      {/* Top Bar */}
      <motion.div
        className="top-bar"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="logo" whileHover={{ scale: 1.05 }}>
          Campus Resource Sharing
        </motion.div>
        <div className="nav-buttons">
          <motion.button
            className="nav-button"
            onClick={() => navigate('/dashboard')}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
          <motion.button
            className="nav-button"
            onClick={() => navigate('/profile')}
            whileTap={{ scale: 0.95 }}
          >
            Profile
          </motion.button>
        </div>
      </motion.div>

      {/* Welcome Section */}
      <motion.div
        className="welcome-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h1>Welcome back</h1>
        <p>Explore the resources or upload a new one.</p>
      </motion.div>

      {/* Resource Cards */}
      <div className="center-content">
        <motion.div
          className="resource-card"
          whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
          onClick={() => navigate('/physical-resources')}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          📦 Physical Resources
        </motion.div>
        <motion.div
          className="resource-card"
          whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
          onClick={() => navigate('/digital-resources')}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          💻 Digital Resources
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;