import React, { useState } from 'react';
import './StudentProfile.css';

const StudentProfile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Elon MUSK',
    email: 'elon.musk@example.com',
    bio: 'Aspiring software engineer passionate about learning new technologies.',
    interests: 'Web Development, Data Science',
    profilePicture: './img/data1.webp',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData({ ...editedData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
  };

  return (
    <div className="full-page-profile">
      <div className="profile-header">
        <div className="profile-picture">
          <img
            src={isEditing ? editedData.profilePicture : profileData.profilePicture}
            alt="Profile"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          )}
        </div>
        <h1>{profileData.name}</h1>
      </div>

      <div className="profile-details">
        <h2>Profile Details</h2>
        {isEditing ? (
          <div className="form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={editedData.bio}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Learning Interests</label>
              <textarea
                name="interests"
                value={editedData.interests}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="profile-actions">
              <button className="save-button" onClick={handleSave}>
                Save Changes
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>Bio:</strong> {profileData.bio}
            </p>
            <p>
              <strong>Learning Interests:</strong> {profileData.interests}
            </p>
            <div className="profile-actions">
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
