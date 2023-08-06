import React, { useState } from "react"
import "../assets/styles/searchBar.css"
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Rechercher des personnages..."
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  )
}

export default SearchBar
