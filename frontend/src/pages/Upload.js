import React from 'react';
import './upload.css';

const Upload = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send form data to backend
    alert('Upload submitted!');
  };

  return (
    <div className="upload-form">
      <h2>Upload Resource</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" required />
        <textarea placeholder="Description" rows="3" required />
        <input type="text" placeholder="Condition" required />
        <label>From Date:</label>
        <input type="date" required />
        <label>To Date:</label>
        <input type="date" required />
        <label>Upload Item (file/image):</label>
        <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" required />
        <button type="submit" className="submit-btn">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
