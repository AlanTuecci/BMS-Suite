import React from 'react'
import './css/search.css'

const search = ({ searchTerm, onSearchChange }) => {
  return (
      <input
          type="text"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={onSearchChange}
      />
  );
};

export default search
