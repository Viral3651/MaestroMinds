import React, { useState } from 'react';
import './TutorProfile.css';

const TutorProfile = () => {
  // Mock data representing initial tutor details
  const [profileData, setProfileData] = useState({
    name: 'Elon Musk',
    email: 'elon.musk@example.com',
    description: 'Experienced Mathematics tutor with 5+ years of teaching experience.',
    department: 'Mathematics',
    profilePicture: './img/profile.jpg',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);

  // Handle input changes during editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // Handle profile picture change
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

  // Save changes and exit edit mode
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
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={editedData.description}
                onChange={handleInputChange}
                rows="4"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="department">Tutoring Department</label>
              <select
                id="department"
                name="department"
                value={editedData.department}
                onChange={handleInputChange}
                required
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Physics">Physics</option>
                <option value="Biology">Biology</option>
                <option value="Psychology">Psychology</option>
              </select>
            </div>
            <div className="profile-actions">
              <button className="save-button" onClick={handleSave}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <p><strong>Name:</strong> {profileData.name}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>Description:</strong> {profileData.description}</p>
            <p><strong>Department:</strong> {profileData.department}</p>
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

export default TutorProfile;
