import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (onSearch) {
      onSearch(newQuery);
    } else {
      console.error("API Error");
    }
  };

  const handleSearchButtonClick = () => {
    if (query) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <>
      <div className="input-container flex flex-col sm:flex-row gap-4 items-center justify-center">
        <input
          className="input"
          name="text"
          type="text"
          placeholder="Search the internet..."
          onChange={handleChange}
          value={query}
        />
        <button
          className="p-5 font-inter font-semibold hover:scale-110 bg-black text-white"
          onClick={handleSearchButtonClick}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default SearchInput;
