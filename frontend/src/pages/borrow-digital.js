import React, { useState, useEffect } from 'react';
import './borrow.css';
import { useNavigate } from 'react-router-dom';

const BorrowDigital = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [resources, setResources] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const [fetchMsg, setFetchMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResources = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setFetchMsg("Please log in to view resources.");
                return;
            }
            console.log("Token:", token); // Debugging line
            try {
                const response = await fetch("http://localhost:5000/api/available-digital-resources", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Response:", response); // Debugging line

                const data = await response.json();
                if (response.ok) {
                    const resourceList = Array.isArray(data) ? data : [];
                    setResources(resourceList);
                    setFilteredResources(resourceList); // Ensure pagination works initially
                } else {
                    setFetchMsg(data.error || "Failed to fetch resources.");
                }
            } catch (err) {
                setFetchMsg("Network error. Is the backend running?");
            }
        };

        fetchResources();
    }, []);

    const handleSuggestionClick = (title) => {
        setSearchQuery(title);
        setSuggestions([]);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    
        if (query.length > 0) {
            const filtered = resources.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered);
            setFilteredResources(filtered);
            setCurrentPage(1);
        } else {
            setSuggestions([]);
            setFilteredResources(resources); // Reset to all resources
            setCurrentPage(1);
        }
    };

    const handleSearchClick = () => {
        const filtered = resources.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredResources(filtered);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredResources.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredResources.length / recordsPerPage);

    return (
        <div className="borrow-page">
            {/* Top Bar */}
            <div className="top-bar">
                <div className="nav-buttons">
                    <button className="nav-button" onClick={() => navigate('/dashboard')}>Home</button>
                    <button className="nav-button" onClick={() => navigate('/uploaddr')}>Upload</button>
                    <button className="nav-button" onClick={() => navigate('/borrow-digital')}>Borrow</button>
                    <button className="nav-button" onClick={() => navigate('/return')}>Return</button>
                </div>
                <div className="profile-button">
                    {/* Replace `123` with actual userId dynamically if available */}
                    <button className="nav-button" onClick={() => navigate(`/profile/`)}>Profile</button>
                </div>
            </div>

            {/* Search and Content */}
            <div className="borrow-content">
                <h2 className="borrow-heading">Find a Digital Resource to Borrow</h2>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search for digital resources..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="search-button" onClick={handleSearchClick}>
                        Search
                    </button>
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((item, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(item.title)}>
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Results Table */}
                {filteredResources.length > 0 ? (
                    <div className="resource-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th> Condition </th>
                                    <th>Uploaded By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.map((resource, index) => (
                                    <tr key={index}>
                                        <td>{resource.title}</td>
                                        <td>{resource.description}</td>
                                        <td>{resource.condition}</td>
                                        <td>
                                            <button
                                                className="nav-button"
                                                onClick={() => navigate(`/profile/${resource.uploaderId}`)}
                                            >
                                                View Profile
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    !fetchMsg && <p className="no-results">No matching resources found.</p>
                )}

                {/* Error or Fetch Message */}
                {fetchMsg && <p className="error-message">{fetchMsg}</p>}
            </div>
        </div>
    );
};

export default BorrowDigital;
