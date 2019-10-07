import React, { useState, useEffect } from "react"
import { getAlbums } from "./backend"
import Album from "./components/album"

import Header from "./components/header"
import SearchBar from "./components/searchBar"
import Footer from "./components/footer"

const App = () => {
  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <Header />
      <SearchBar />
      <div className="flex-grow">
        <p>Albums</p>
      </div>
      <Footer />
    </div>
  )
}

export default App
