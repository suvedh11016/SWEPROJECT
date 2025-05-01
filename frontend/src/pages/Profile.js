import React, { useState, useEffect } from "react";
import './Profile.css';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [profileMsg, setProfileMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setProfileMsg("Please log in to view your profile.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Response:", data);

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
    <div className="profile-container">
      <h2>Profile</h2>
      {profileMsg ? (
        <div className="error-message">{profileMsg}</div>
      ) : (
        <div>
          {profileData ? (
            <div className="profile-info">
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
            <p className="loading-message">Loading profile...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
