import React, { useEffect, useState } from 'react';
import './physicalresources.css';
import { useNavigate } from 'react-router-dom';

const PhysicalResources = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [fetchMsg, setFetchMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    const fetchResources = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setFetchMsg("Please log in to view resources.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/physical-resources", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Upload data response:", data);

        if (response.ok) {
          setResources(Array.isArray(data) ? data : []);
        } else {
          setFetchMsg(data.error || "Failed to fetch resources.");
        }
      } catch (err) {
        setFetchMsg("Network error. Is the backend running?");
      }
    };

    fetchResources();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = resources.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(resources.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="physical-container">
      <div className="top-bar">
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate('/dashboard')}>Home</button>
          <button className="nav-button" onClick={() => navigate('/upload')}>Upload</button>
          <button className="nav-button" onClick={() => navigate('/borrow')}>Borrow</button>
          <button className="nav-button" onClick={() => navigate('/return-physical')}>Return</button>
        </div>
        <div className="profile-button">
          <button className="nav-button" onClick={() => navigate('/profile/${data.userId')}>Profile</button>
        </div>
      </div>
      <div className="ph-section">
        <h1>Physical Resources</h1>
        <p>Explore the resources or Upload the resources</p>
      </div>

      <div className="main-content">
        <div className="resource-list">
          <h2 className="list-heading">List of Resources</h2>
          {fetchMsg ? (
            <div className="error-message">{fetchMsg}</div>
          ) : (
            <>
              <div className="records-control">
                <label htmlFor="recordsPerPage">Records per page: </label>
                <select
                  id="recordsPerPage"
                  value={recordsPerPage}
                  onChange={handleRecordsPerPageChange}
                >
                  {[5, 10, 15, 20].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <table className="resource-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Condition</th>
                    <th>Description</th>
                    <th>Uploader</th>
                  </tr>
                </thead>
                <tbody>
                 {currentRecords.map((item, index) => (
                 <tr key={item.id ?? index}>
                <td>{item.id ?? "N/A"}</td>
                <td>{item.title ?? "Untitled"}</td>
                <td>{item.condition ?? "Unknown"}</td>
                <td>{item.description ?? "-"}</td>
                <td>
                <button
             className="nav-button"
              onClick={() => navigate(`/profile/${item.uploaderId ?? item.uploader}`)}
        >
          View Profile
        </button>
      </td>
    </tr>
  ))}
</tbody>

              </table>

              <div className="pagination">
                <button
                  className="pagination-button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhysicalResources;
