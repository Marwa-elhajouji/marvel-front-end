import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import "../assets/styles/comics.css"

import Character from "../components/Character"
import SearchBar from "../components/SearchBar"

const Comics = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--marvel-backend--j6wjsym262gs.code.run/comics`
      )
      setData(response.data.results)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const filteredData = data.filter(
    (comic) =>
      (comic.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (comic.description || "").toLowerCase().includes(search.toLowerCase())
  )


  filteredData.sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div>
      <SearchBar onSearch={setSearch} />

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <h1>Liste des comics</h1>
          <div className="comic-list">
            {filteredData.map((comic) => {
              return (
                <div className="comic" key={comic._id}>
                  <p>
                    {comic.thumbnail && (
                      <img
                        alt={comic.title}
                        src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                      />
                    )}
                  </p>
                  <div className="comic-info">
                    <p className="comic-title">{comic.title}</p>
                    <p className="comic-desc">{comic.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Comics
