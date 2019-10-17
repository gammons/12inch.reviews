// @flow
import React from "react"

import "./header/styles.css"

import SpotifyLoginButton from "./login/spotifyLoginButton"

type Props = {
  onSpotifyLoginClick: () => void,
  isLoggedIn: boolean
}

const Header = (props: Props) => {
  return (
    <div className="w-full bg-gray-200 px-8 p-2 overflow-hidden border-b-1 border-gray-400 shadow flex flex-row flex-wrap justify-between items-center">
      <div className="flex flex-row items-center m-auto sm:m-0">
        <img
          className="hidden sm:block"
          src="record.svg"
          style={{ width: 100, height: 100 }}
        />
        <h1
          className="text-4xl sm:text-5xl"
          style={{ fontFamily: "Rock Salt" }}
        >
          12inch.reviews
        </h1>
      </div>
      <div className="py-8 md:p-0 m-auto sm:m-0">
        {!props.isLoggedIn && (
          <SpotifyLoginButton onClick={props.onSpotifyLoginClick} />
        )}
      </div>
    </div>
  )
}

export default Header
