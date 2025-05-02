// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Registration from './pages/Registration';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Registration />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/dashboard';
import PhysicalResources from './pages/physicalresources';
import Upload from './pages/Upload';
import Borrow from './pages/Borrow';
import Return from './pages/Return';
import Profile from './pages/Profile';
import DigitalResources from './pages/digitalresources';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/physical-resources" element={<PhysicalResources />} />
        <Route path="/digital-resources" element={<DigitalResources />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/return" element={<Return />} />
        <Route path="/profile/:user_id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;