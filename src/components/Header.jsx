import React from "react"
import logo from "../assets/images/logo.jpg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "../assets/styles/header.css"
const Header = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const handleSubmit = async (event) => {
    event.preventDefault()
  }
  return (
    <>
      <div className="header-container">
        <div
          onClick={() => {
            navigate("/")
          }}>
          <img className="logo-marvel" src={logo} alt="marvel" />
        </div>

        <div className="buttons">
          <button
            onClick={() => {
              navigate("/characters")
            }}
            className="header_button">
            Personnages
          </button>
          <button
            onClick={() => {
              navigate("/comics")
            }}>
            Comics
          </button>

          <button
            onClick={() => {
              navigate("/favoris")
            }}>
            Favoris
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
