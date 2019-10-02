// @flow
import React, { useState } from "react"
// import { useSpotifyWebPlaybackSdk } from "use-spotify-web-playback-sdk"
import SpotifyPlayer from "../spotifyPlayer"

import { library, icon } from "@fortawesome/fontawesome-svg-core"
import { faPlay } from "@fortawesome/free-solid-svg-icons"

const PlayButton = props => {
  return props.isPlaying ? (
    <button onClick={props.onClick}>Pause</button>
  ) : (
    <button onClick={props.onClick}>Play</button>
  )
}

const Player = props => {
  console.log("props is ", props)
  const [isPlaying, setIsPlaying] = useState(false)
  const [spotifyPlayer, setSpotifyPlayer] = useState(null)
  // const [deviceID, setDeviceID] = useState(null)
  // const [player, setPlayer] = useState(null)

  //library.add(faPlay)
  // const playIcon = icon({ prefix: "fas", iconName: "play" })
  // console.log("playIcon = ", playIcon)

  React.useEffect(() => {
    const aPlayer = new window.Spotify.Player({
      name: "12inch.reviews Player",
      getOauthToken: cb => {
        cb(props.accessToken)
      }
    })
    aPlayer.addListener("initialization_error", console.error)
    aPlayer.addListener("authentication_error", console.error)
    aPlayer.addListener("account_error", console.error)
    aPlayer.addListener("playback_error", console.error)
    aPlayer.addListener("player_state_changed", console.log)

    aPlayer.addListener("ready", ret => {
      setSpotifyPlayer(new SpotifyPlayer(ret.device_id, props.accessToken))
    })

    aPlayer.connect()
  }, [])

  const onTogglePlay = () => {
    if (!isPlaying) {
      spotifyPlayer.play(props.uri).then(() => setIsPlaying(!isPlaying))
    } else {
      spotifyPlayer.pause().then(() => setIsPlaying(!isPlaying))
    }
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PlayButton isPlaying={isPlaying} onClick={onTogglePlay} />
    </React.Suspense>
  )
}

export default Player
