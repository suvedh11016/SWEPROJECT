// import React from 'react';
// import './Profile.css';

// const Profile = () => {
//   const user = {
//     name: 'Sreekar Reddy',
//     id: 'USR001234',
//     email: 'sreekar@example.com',
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <h2>User Profile</h2>
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Unique ID:</strong> {user.id}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <button className="chat-button">Chat</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from 'react';
import './Profile.css'; // Assuming you have a CSS file for styling

function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/profile')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(err => console.error('Error fetching user data:', err));
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Unique ID:</strong> {userData.id}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <button className="chat-button">Chat</button>
      </div>
    </div>
  );
}

export default UserProfile;