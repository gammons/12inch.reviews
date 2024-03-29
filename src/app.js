// @flow
import React, { useState, useEffect, useRef } from "react"
import { useBottomScrollListener } from "react-bottom-scroll-listener"
import ReactGA from "react-ga"

import Album from "./components/album"

import * as constants from "./constants"
import Header from "./components/header"
import SearchBar from "./components/searchBar"
import Player from "./components/player"
import Footer from "./components/footer"

import AlbumSearch from "./services/search"
import AlbumStore from "./services/albumStore"
import TokenManager from "./services/tokenManager"
import getUrlParam from "./services/getUrlParam"

const redirectUrl = `${window.location.href}.netlify/functions/spotifyLogin`

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
  const [isLoggedIn, setIsLoggedIn] = useState(TokenManager.hasAccessToken())

  const [albumCount, setAlbumCount] = useState(25)

  useEffect(() => {
    ReactGA.initialize("UA-73229-13")
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  useEffect(() => {
    const albumStore = new AlbumStore()

    albumStore.initialize().then((initialAlbums) => {
      albums.current = initialAlbums
      setFilteredAlbums(albums.current)
      albumStore.reconcile().then(async () => {
        albums.current = await albumStore.retrieve()
        setFilteredAlbums(albums.current)
      })
    })
  }, [])

  useEffect(() => {
    const _accessToken = getUrlParam("accessToken")
    const _refreshToken = getUrlParam("refreshToken")
    const expires = getUrlParam("expires")

    if (!_accessToken) return

    if (parseInt(expires) > Date.now()) {
      TokenManager.setAccessToken(_accessToken)
    }
    TokenManager.setRefreshToken(_refreshToken)

    setIsLoggedIn(true)
  }, [])

  useBottomScrollListener(
    () => {
      setAlbumCount(albumCount + 25)
    },
    100,
    100
  )

  const onPlayAlbum = (uri) => {
    if (isLoggedIn) {
      setPlayingAlbumURI(uri)
    } else {
      alert(
        "In order to listen, you'll need to grant access to Spotify.  Please log into Spotify using the green button above!"
      )
    }
  }

  const onSearch = (search) => {
    setFilteredAlbums(AlbumSearch(albums.current, search))
  }

  const onLogout = () => {
    TokenManager.clearTokens()
    setIsLoggedIn(false)
  }

  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        onSpotifyLoginClick={onSpotifyLoginClick}
      />

      <SearchBar onSearch={onSearch} />

      <div className="flex-grow flex flex-row flex-wrap bg-gray-100 md:p-8 justify-center pb-48">
        {filteredAlbums.slice(0, albumCount).map((album, count) => (
          <Album key={count} album={album} onPlay={onPlayAlbum} />
        ))}
      </div>

      <div className="fixed w-full bottom-0 border-t border-gray-400">
        <Player
          uri={playingAlbumURI}
          accessTokenFn={TokenManager.accessTokenFn}
        />
        <Footer />
      </div>
    </div>
  )
}

export default App
