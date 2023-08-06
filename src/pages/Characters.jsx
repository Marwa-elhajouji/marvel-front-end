import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../assets/styles/characters.css"

import Character from "../components/Character"
import SearchBar from "../components/SearchBar"
import Cookies from "js-cookie"

const Characters = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [charactersPerPage] = useState(2)

  useEffect(() => {
    fetchCharacters()
  }, [currentPage])

  const fetchCharacters = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `https://site--marvel-backend--j6wjsym262gs.code.run/characters?offset=${
          (currentPage - 1) * charactersPerPage
        }&limit=${charactersPerPage}`
      )
      setData(response.data.results)

      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching characters:", error)
      setIsLoading(false)
    }
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  useEffect(() => {
    setFilteredData(
      data.filter(
        (character) =>
          (character.name || "").toLowerCase().includes(search.toLowerCase()) ||
          (character.description || "")
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    )
  }, [data, search, currentPage])

  const handleToggleFavorite = (characterId, isFavorite) => {
    const updatedData = data.map((character) =>
      character._id === characterId ? { ...character, isFavorite } : character
    )
    setData(updatedData)

    const favoritesFromCookies = Cookies.get("favorites") || {}
    const updatedFavorites = { ...favoritesFromCookies }
    updatedFavorites[characterId] = isFavorite
    Cookies.set("favorites", updatedFavorites, { expires: 365 })
  }
  return (
    <div>
      <SearchBar onSearch={setSearch} />

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <h1>Liste des personnages </h1>
          <div className="character-wrapper">
            {filteredData &&
              filteredData.map((character) => {
                return (
                  <Character
                    key={character._id}
                    character={character}
                    onToggleFavorite={handleToggleFavorite}
                  />
                )
              })}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Précédent
            </button>
            <button
              onClick={handleNextPage}
              disabled={data.length < charactersPerPage}>
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Characters
