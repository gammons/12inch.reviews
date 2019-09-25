import React, { useState, useEffect } from "react"
import { getAlbums } from "./backend"
import Album from "./components/album"

const App = () => {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    const retrieve = async () => {
      setAlbums(await getAlbums())
    }
    retrieve()
  }, [albums.length])

  return (
    <div>
      <h1>Albums</h1>
      {albums.map(album => (
        <Album album={album} />
      ))}
    </div>
  )
}

export default App
