// @flow
import React, { useState, useEffect } from "react"

import Album from "./components/album"
import AlbumModel from "./models/album"
import UserModel from "./models/user"

import * as constants from "./constants"
import Header from "./components/header"
import SearchBar from "./components/searchBar"
import Player from "./components/player"
import Footer from "./components/footer"

const redirectUrl = constants.FUNCTIONS_URL + "/.netlify/functions/spotifyLogin"

const onSpotifyLoginClick = () => {
  const args = []
  args.push(`client_id=${constants.SPOTIFY_CLIENT_ID}`)
  args.push("response_type=code")
  args.push(`redirect_uri=${redirectUrl}`)
  args.push("scope=streaming,user-read-email,user-read-private")

  window.location.replace(
    `https://accounts.spotify.com/authorize?${args.join("&")}`
  )
}

const App = () => {
  const [albums, setAlbums] = useState([])
  const [user, setUser] = useState(new UserModel())
  const [playingAlbumURI, setPlayingAlbumURI] = useState(null)

  useEffect(() => {
    fetch("first-albums.json")
      .then(data => data.json())
      .then(data => {
        setAlbums(data.albums.map(a => new AlbumModel(a)))
      })
  }, [])

  useEffect(() => {
    const token =
      window.localStorage.getItem("accessToken") || getUrlParam("accessToken")
    if (token) {
      setUser(new UserModel({ accessToken: token }))
    }
  }, [])

  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <Header onSpotifyLoginClick={onSpotifyLoginClick} />

      <SearchBar />

      <div className="flex-grow flex flex-row flex-wrap bg-gray-100 p-8 justify-center">
        {albums.map((album, count) => (
          <Album key={count} album={album} onPlay={setPlayingAlbumURI} />
        ))}
      </div>

      <div className="fixed w-full bottom-0 border-t border-gray-400">
        <Player uri={playingAlbumURI} accessToken={user.accessToken} />
        <Footer />
      </div>
    </div>
  )
}

const getUrlParam = name => {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        window.location.search
      ) || [null, ""])[1].replace(/\+/g, "%20")
    ) || null
  )
}

export default App
