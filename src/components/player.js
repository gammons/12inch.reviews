// @flow
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library, icon } from "@fortawesome/fontawesome-svg-core"
import {
  faStepForward,
  faStepBackward
} from "@fortawesome/free-solid-svg-icons"

import SpotifyPlayer from "../spotifyPlayer"
import PlayButton from "./player/playButton"

const Player = props => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [spotifyPlayer, setSpotifyPlayer] = useState(null)
  const [position, setPosition] = useState(0)
  const [trackNum, setTrackNum] = useState(0)
  const [artist, setArtist] = useState("No Artist")
  const [album, setAlbum] = useState("No album")
  const [trackTitle, setTrackTitle] = useState("No track")
  const [trackDuration, setTrackDuration] = useState(0)
  const [albumImageURL, setAlbumImageURL] = useState(null)

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

    aPlayer.addListener("player_state_changed", state => {
      console.log("player_state = ", state)

      setArtist(state.track_window.current_track.artists[0].name)
      setAlbum(state.track_window.current_track.album.name)
      setTrackTitle(state.track_window.current_track.name)
      setTrackDuration(state.track_window.current_track.duration_ms)
      setAlbumImageURL(state.track_window.current_track.album.images[0].url)
      setPosition(state.position)

      if (state.paused) {
        setIsPlaying(false)
      }
    })

    aPlayer.addListener("ready", ret => {
      setSpotifyPlayer(new SpotifyPlayer(ret.device_id, props.accessToken))
    })

    aPlayer.connect()
  }, [])

  const onTogglePlay = () => {
    if (!isPlaying) {
      spotifyPlayer
        .play(props.uri, trackNum, position)
        .then(() => setIsPlaying(!isPlaying))
    } else {
      spotifyPlayer.pause().then(() => setIsPlaying(!isPlaying))
    }
  }

  const onRequestNextTrack = () => {
    if (isPlaying) {
      spotifyPlayer.play(props.uri, trackNum + 1, 0)
    }
    setPosition(0)
    setTrackNum(trackNum + 1)
  }

  const onRequestPrevTrack = () => {
    if (trackNum == 0) return

    if (isPlaying) {
      spotifyPlayer.play(props.uri, trackNum - 1, 0)
    }
    setPosition(0)
    setTrackNum(trackNum - 1)
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PrevTrackButton onClick={onRequestPrevTrack} />
      <PlayButton isPlaying={isPlaying} onClick={onTogglePlay} />
      <NextTrackButton onClick={onRequestNextTrack} />
    </React.Suspense>
  )
}

const NextTrackButton = props => {
  return (
    <a className="text-2xl" onClick={props.onClick}>
      <FontAwesomeIcon icon={faStepForward} />
    </a>
  )
}

const PrevTrackButton = props => {
  return (
    <a className="text-2xl text-red-500" onClick={props.onClick}>
      <FontAwesomeIcon icon={faStepBackward} />
    </a>
  )
}

export default Player
