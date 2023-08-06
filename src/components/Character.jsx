import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"
import "../assets/styles/character.css"

const Character = ({ character }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (character && character._id) {
      const favoritesFromCookies = Cookies.get("favorites") || {}
      setIsFavorite(favoritesFromCookies[character._id] ? true : false)
    }
  }, [character])

  const toggleFavorite = () => {
    const updatedIsFavorite = !isFavorite

    setIsFavorite(updatedIsFavorite)

    const favoritesFromCookies = Cookies.get("favorites") || {}
    const updatedFavorites = { ...favoritesFromCookies }

    updatedFavorites[character._id.toString] = updatedIsFavorite
    Cookies.set("favorites", updatedFavorites, { expires: 365 })
  }
  if (!character) {
    return null
  }
  return (
    <Link to={`/comics-char/${character._id}`}>
      <div className="character">
        <div>
          {character.thumbnail && (
            <img
              alt={character.name}
              src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
            />
          )}
        </div>
        <div className="characterInfos">
          <div className="char-name">{character.name && character.name}</div>
          <div className="char-desc">
            {character.description && character.description}
          </div>
        </div>
        <button
          onClick={(event) => {
            event.preventDefault()
            toggleFavorite()
          }}>
          {isFavorite ? "Retirer des favoris" : "Ajouter au favoris"}
        </button>
      </div>
    </Link>
  )
}
export default Character
