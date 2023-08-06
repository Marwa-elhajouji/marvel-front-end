import React from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Characters from "./pages/Characters"
import ComicsChar from "./pages/ComicsChar"
import Comics from "./pages/Comics"
import Favoris from "./pages/Favoris"
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />

        <Route path="/comics-char/:characterId" element={<ComicsChar />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favoris" element={<Favoris />} />
      </Routes>
    </Router>
  )
}

export default App
