import React, { useState, useEffect } from "react";
import './Profile.css';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [profileMsg, setProfileMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      const user_id = localStorage.getItem('userId');
      if (!token) {
        setProfileMsg("Please log in to view your profile.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/profile/${user_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProfileData(data);
        } else {
          setProfileMsg(data.error || "Failed to fetch profile.");
        }
      } catch (err) {
        setProfileMsg("Network error. Is the backend running?");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: 'white' 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '450px', 
        backgroundColor: '#f5f7fa', 
        borderRadius: '16px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
        overflow: 'hidden'
      }}>
        <div style={{ padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>Profile</h2>
          </div>
          
          {profileMsg ? (
            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              borderRadius: '8px',
              backgroundColor: '#fef2f2',
              color: '#b91c1c',
              border: '1px solid #fecaca'
            }}>
              {profileMsg}
            </div>
          ) : (
            <div>
              {profileData ? (
                <div style={{ 
                  marginTop: '16px', 
                  padding: '12px', 
                  borderRadius: '8px',
                  backgroundColor: '#f0fdf4',
                  color: '#166534',
                  border: '1px solid #bbf7d0'
                }}>
                  <p>
                    <strong>Username:</strong> {profileData.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {profileData.email}
                  </p>
                  <p>
                    <strong>User ID:</strong> {profileData.id}
                  </p>
                </div>
              ) : (
                <p style={{ 
                  marginTop: '16px', 
                  padding: '12px', 
                  borderRadius: '8px',
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  border: '1px solid #fde68a',
                  textAlign: 'center'
                }}>
                  Loading profile...
                </p>
              )}
            </div>
          )}
        </div>
        
        <div style={{ 
          height: '4px', 
          background: 'linear-gradient(to right, #4b5563, rgb(20, 66, 136), #4b5563)' 
        }}></div>
      </div>
    </div>
  );
}

export default Profile;
