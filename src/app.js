// @flow
import React, { useState, useEffect, useRef } from "react"

import Album from "./components/album"
import AlbumModel from "./models/album"
import UserModel from "./models/user"

import * as constants from "./constants"
import Header from "./components/header"
import SearchBar from "./components/searchBar"
import Player from "./components/player"
import Footer from "./components/footer"

import AlbumSearch from "./services/search"
import tokenRefresh from "./services/tokenRefresher"

const redirectUrl = constants.FUNCTIONS_URL + "/.netlify/functions/spotifyLogin"
const fiftyMinutes = 1000 * 60 * 50

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
  const albums = useRef([])
  const [filteredAlbums, setFilteredAlbums] = useState([])
  const [user, setUser] = useState(new UserModel())
  const [refreshToken, setRefreshToken] = useState(getUrlParam("refreshToken"))
  const [playingAlbumURI, setPlayingAlbumURI] = useState(null)

  useEffect(() => {
    fetch("first-albums.json")
      .then(data => data.json())
      .then(data => {
        const al = data.albums.map(a => new AlbumModel(a))
        albums.current = al
        setFilteredAlbums(al)
      })
  }, [])

  useEffect(() => {
    const accessToken = getUrlParam("accessToken")
    const expiresIn = getUrlParam("expiresIn")

    if (accessToken) {
      setTimeout(refreshAccessToken, fiftyMinutes)
      setUser(new UserModel({ accessToken, refreshToken, expiresIn }))
    }
  }, [])

  const refreshAccessToken = async () => {
    const refreshed = await tokenRefresh(refreshToken)
    user.accessToken = refreshed.access_token
    user.refreshToken = refreshed.refresh_token
    setUser(user)
    setTimeout(refreshAccessToken, fiftyMinutes)
  }

  const onSearch = search => {
    setFilteredAlbums(AlbumSearch(albums.current, search))
  }

  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <Header
        user={user.accessToken}
        onSpotifyLoginClick={onSpotifyLoginClick}
      />

      <SearchBar onSearch={onSearch} />

      <div className="flex-grow flex flex-row flex-wrap bg-gray-100 p-8 justify-center pb-48">
        {filteredAlbums.slice(0, 10).map((album, count) => (
          <Album
            playDisabled={user.accessToken === null}
            key={count}
            album={album}
            onPlay={setPlayingAlbumURI}
          />
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
