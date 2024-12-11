import React from 'react';

function PrdSearch({ onSearch }) {
  return (
    <div>
      <input
        type="search"
        placeholder="  Search Products..."
        className="px-4 py-2 bg-lightsilver border border-compgray/50 placeholder-compgray rounded-lg"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default PrdSearch;
