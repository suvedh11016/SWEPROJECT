import React, { useState } from 'react';
import './borrow.css';

const Borrow = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    // Here you can implement search logic like filtering data or making API calls
    console.log("Searching for:", searchQuery);
    // You can also display results if you have them
  };

  return (
    <div className="main-content">
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for physical resources..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Borrow;
