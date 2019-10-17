// @flow
import React, { useState, useEffect, useRef } from "react"
import { useBottomScrollListener } from "react-bottom-scroll-listener"
import ReactGA from "react-ga"

import Album from "./components/album"
import AlbumModel from "./models/album"
//import UserModel from "./models/user"

import * as constants from "./constants"
import Header from "./components/header"
import SearchBar from "./components/searchBar"
import Player from "./components/player"
import Footer from "./components/footer"

import AlbumSearch from "./services/search"
import tokenRefresh from "./services/tokenRefresher"

const redirectUrl = `${window.location.href}.netlify/functions/spotifyLogin`
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
  const [playingAlbumURI, setPlayingAlbumURI] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [albumCount, setAlbumCount] = useState(25)

  const accessTokenRef = useRef(accessToken)
  const refreshTokenRef = useRef(null)

  useEffect(() => {
    ReactGA.initialize("UA-73229-13")
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  useEffect(() => {
    fetch("albums.json")
      .then(data => data.json())
      .then(data => {
        const al = data.albums.map(a => new AlbumModel(a))
        albums.current = al
        setFilteredAlbums(al)
      })
  }, [])

  useEffect(() => {
    const _accessToken = getUrlParam("accessToken")
    const _refreshToken = getUrlParam("refreshToken")

    if (_accessToken) {
      accessTokenRef.current = _accessToken
      refreshTokenRef.current = _refreshToken
      setAccessToken(_accessToken)
      setTimeout(refreshAccessToken, fiftyMinutes)
    }
  }, [])

  useBottomScrollListener(
    () => {
      setAlbumCount(albumCount + 25)
    },
    100,
    100
  )

  const onPlayAlbum = uri => {
    if (accessTokenRef.current) {
      setPlayingAlbumURI(uri)
    } else {
      alert(
        "In order to listen, you'll need to grant access to Spotify.  Please log into Spotify using the green button above!"
      )
    }
  }

  const refreshAccessToken = async () => {
    const refreshed = await tokenRefresh(refreshTokenRef.current)
    accessTokenRef.current = refreshed.access_token
    setAccessToken(accessTokenRef.current)

    if (refreshed.refresh_token) {
      refreshTokenRef.current = refreshed.refresh_token
    }

    setTimeout(refreshAccessToken, fiftyMinutes)
  }

  const accessTokenFn = cb => {
    cb(accessTokenRef.current)
  }

  const onSearch = search => {
    setFilteredAlbums(AlbumSearch(albums.current, search))
  }

  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <Header
        user={accessTokenRef.current}
        onSpotifyLoginClick={onSpotifyLoginClick}
      />

      <SearchBar onSearch={onSearch} />

      <div className="flex-grow flex flex-row flex-wrap bg-gray-100 p-8 justify-center pb-48">
        {filteredAlbums.slice(0, albumCount).map((album, count) => (
          <Album key={count} album={album} onPlay={onPlayAlbum} />
        ))}
      </div>

      <div className="fixed w-full bottom-0 border-t border-gray-400">
        <Player uri={playingAlbumURI} accessTokenFn={accessTokenFn} />
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
