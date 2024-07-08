import React, { useState } from "react";
import "./index.css";

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (onSearch) {
      console.log("Calling onSearch with query:", newQuery);
      onSearch(newQuery);
    } else {
      console.error("API Error");
    }
  };
  return (
    <>
      <div className="input-container">
        <input
          className="input"
          name="text"
          type="text"
          placeholder="Search the internet..."
          onChange={handleChange}
          value={query}
        />
      </div>
    </>
  );
};

export default SearchInput;
