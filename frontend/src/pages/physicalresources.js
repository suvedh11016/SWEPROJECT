import React from 'react';
import './physicalresources.css';
import { useNavigate } from 'react-router-dom';

const PhysicalResources = () => {
  const navigate = useNavigate();
  return (
    <div className="physical-container">
      <div className="sidebar">
        <button className="nav-button">Home</button>
        <button className="nav-button" onClick={() => navigate('/upload')}>Upload</button>
        <button className="nav-button" onClick={() => navigate('/borrow')}>Borrow</button>
        <button className="nav-button">Return</button>
      </div>

      <div className="main-content">
        <h2 className="list-heading">LIST</h2>
        <table className="resource-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Condition</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>3D Printer</td>
              <td>Good</td>
              <td>Located in Lab A</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Raspberry Pi</td>
              <td>New</td>
              <td>Available with accessories</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhysicalResources;
