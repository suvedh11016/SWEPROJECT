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
import Profile from './pages/Profile';
import DigitalResources from './pages/digitalresources';
import UploadDigital from './pages/uploaddr';
import BorrowDigital from './pages/borrow-digital'; 
import GivenPH from './pages/givenph';
import GivenDT from './pages/givendt';
import TakenPH from './pages/takenph';
import TakenDT from './pages/takendt';
import Returnph from './pages/Returnph';
import Returndt from './pages/Returndt'; 



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
        <Route path="/uploaddr" element={<UploadDigital />} />
        <Route path="/borrow-digital" element={<BorrowDigital />} />
        <Route path="/givenph" element={<GivenPH />} />
        <Route path="/givendt" element={<GivenDT />} />
        <Route path="/takenph" element={<TakenPH />} />
        <Route path="/takendt" element={<TakenDT />} />
        <Route path="/return-physical" element={<Returnph />} />
        <Route path="/return-digital" element={<Returndt />} />
      </Routes>
    </Router>
  );
}

export default App;
