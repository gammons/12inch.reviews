// @flow
import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpotify } from "@fortawesome/free-brands-svg-icons"

const SpotifyLoginButton = props => {
  return (
    <a
      className="cursor-pointer"
      style={{
        backgroundColor: "#1DB954",
        color: "#FFFFFF",
        letterSpacing: "2px",
        textTransform: "uppercase",
        marginBottom: "20px",
        marginTop: "20px",
        fontSize: "14px",
        textAlign: "center",
        verticalAlign: "middle",
        padding: "18px 48px 16px",
        fontWeight: "700",
        fontFamily: "Circular, Helvetica, Arial, sans-serif",
        borderColor: "rgb(8, 53, 24)",
        borderTopLeftRadius: "500px",
        borderTopRightRadius: "500px",
        borderBottomLeftRadius: "500px",
        borderBottomRightRadius: "500px"
      }}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faSpotify} /> Listen with Spotify
    </a>
  )
}

export default SpotifyLoginButton
