// @flow
import * as React from "react"

const SpotifyLogin = () => {
  const clientId = "246fbd105e774530b341d50a7eedc0fc"
  const scopes = encodeURIComponent(
    "user-read-playback-state streaming user-read-email user-read-private"
  )
  const redirectUrl = encodeURIComponent(
    "https://en9e0rnevv90o.x.pipedream.net"
  )

  return (
    <a
      target="_blank"
      href={`https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUrl}`}
    >
      Login with Spotify
    </a>
  )
}

export default SpotifyLogin
