import React from "react"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../assets/styles/comicsChar.css"
const ComicsChar = () => {
  const { characterId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [comicsList, setComicsList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--j6wjsym262gs.code.run/comics/${characterId}`
        )
        setComicsList(response.data.comics)
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur")
      }
    }

    fetchData()
  }, [characterId])
  return isLoading ? (
    <p>Loading</p>
  ) : (
    <main>
      <h1>Liste des comics</h1>
      <div className="listOfComics">
        {comicsList.map((comic) => {
          return (
            <div className="comic-char" key={comic._id}>
              <div className="comic-img">
                {comic.thumbnail && (
                  <img
                    alt={comic.title}
                    src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                  />
                )}
              </div>
              <div className="comic-infos">
                <p className="comic-title" key={comic._id}>
                  {comic.title}
                </p>
                <p className="comic-desc">{comic.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default ComicsChar
