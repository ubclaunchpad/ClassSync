import "./index.css";
import React, { useState } from 'react'
import Search from "../../assets/search.png"

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const courses = [
        { name: "Python" },
        { name: "Java" },
        { name: "Scratch" }
    ];

    if (searchInput.length > 0) {
        courses.filter((courses) => {
            return courses.name.match(searchInput);
        });
    }
    return (
        <input type="text"
            class="search-bar"
            onChange={handleChange}
            value={searchInput} />

    );
};

export default SearchBar;