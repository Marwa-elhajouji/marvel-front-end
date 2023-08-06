import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Character from "../components/Character"

const Favoris = () => {
  const [favorites, setFavorites] = useState([])
  useEffect(() => {
    const favoritesFromCookies = Cookies.get("favorites") || {}
    const favoritesList = Object.keys(favoritesFromCookies)
      .filter((characterId) => favoritesFromCookies[characterId])
      .map((characterId) => parseInt(characterId))
    setFavorites(favoritesList)
  }, [])
  console.log("favorite", favorites)
  return (
    <div>
      <h1>Personnages Favoris</h1>
      <div className="character-wrapper">
        {favorites.map((characterId) => (
          <Character key={characterId} characterId={characterId} />
        ))}
      </div>
    </div>
  )
}
export default Favoris
