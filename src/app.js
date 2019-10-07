import React, { useState, useEffect } from "react"

import Album from "./components/album"
import AlbumModel from "./models/album"

import Header from "./components/header"
import SearchBar from "./components/searchBar"
import Footer from "./components/footer"

const App = () => {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    fetch("first-albums.json")
      .then(data => data.json())
      .then(data => {
        setAlbums(data.albums.map(a => new AlbumModel(a)))
      })
  }, [])

  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <Header />
      <SearchBar />
      <div className="flex-grow flex flex-row flex-wrap bg-gray-100 p-8">
        {albums.map((album, count) => (
          <Album key={count} album={album} />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default App
