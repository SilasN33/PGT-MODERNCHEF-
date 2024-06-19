import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './searchbarComponent.css';

function SearchbarComponent({ onSearch }) {
  const [input, setInput] = useState('');

  const handleChange = (value) => {
    setInput(value);
    onSearch(value);
  }

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input 
        placeholder='Pesquise uma receita' 
        value={input} 
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchbarComponent;