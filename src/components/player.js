// @flow
import React, { useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { icon } from "@fortawesome/fontawesome-svg-core"
import {
  faStepForward,
  faStepBackward
} from "@fortawesome/free-solid-svg-icons"

import SpotifyPlayer from "../spotifyPlayer"
import PlayButton from "./player/playButton"
import ProgressBar from "./player/progressBar"

let timer

const Player = props => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [spotifyPlayer, setSpotifyPlayer] = useState(null)

  const [position, setPosition] = useState(0)
  const positionRef = useRef(position)
  positionRef.current = position

  const [trackNum, setTrackNum] = useState(0)
  const [artist, setArtist] = useState("No Artist")
  const [album, setAlbum] = useState("No album")
  const [trackTitle, setTrackTitle] = useState("No track")
  const [trackDuration, setTrackDuration] = useState(0)
  const [albumImageURL, setAlbumImageURL] = useState(
    "https://i.scdn.co/image/75e90ce91798e339ccee3835267f0918acb98700"
  )

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
      setArtist(state.track_window.current_track.artists[0].name)
      setAlbum(state.track_window.current_track.album.name)
      setTrackTitle(state.track_window.current_track.name)
      setTrackDuration(state.track_window.current_track.duration_ms)
      setAlbumImageURL(state.track_window.current_track.album.images[2].url)
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

  React.useEffect(() => {
    if (!isPlaying) {
      clearTimeout(timer)
    }
  })

  const onTogglePlay = () => {
    if (!isPlaying) {
      spotifyPlayer.play(props.uri, trackNum, position).then(() => {
        setIsPlaying(!isPlaying)
        progressTick()
      })
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

  const progressTick = () => {
    setPosition(positionRef.current + 1000)
    timer = setTimeout(progressTick, 1000)
  }

  const progressClick = percentage => {
    const newPosition = trackDuration * percentage
    setPosition(newPosition)
    if (isPlaying) {
      spotifyPlayer.play(props.uri, trackNum, newPosition)
    }
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div className="w-auto flex flex-row">
        <div
          className="h-48 w-48 flex-none bg-cover rounded-t lg:rounded-t-none md:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${albumImageURL})` }}
        />

        <div className="w-4/5 border border-gray-400">
          <div className="p-4">
            <p className="text-xl font-bold">{artist}</p>
            <p className="text-lg font-bold">{trackTitle}</p>
            <p className="text-lg font-bold text-gray-600">{album}</p>
          </div>

          <div className="w-3/5 px-4">
            <div className="w-full flex flex-row justify-around items-center mb-4">
              <PrevTrackButton onClick={onRequestPrevTrack} />
              <PlayButton isPlaying={isPlaying} onClick={onTogglePlay} />
              <NextTrackButton onClick={onRequestNextTrack} />
            </div>

            <ProgressBar
              percentage={position / trackDuration}
              onClick={progressClick}
            />
          </div>
        </div>
      </div>
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
    <a className="text-2xl" onClick={props.onClick}>
      <FontAwesomeIcon icon={faStepBackward} />
    </a>
  )
}

export default Player
