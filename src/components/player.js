// @flow
import React, { useState, useRef } from "react"

import SpotifyPlayer from "../models/spotifyPlayer"
import PlayButton from "./player/playButton"
import ProgressBar from "./player/progressBar"
import NextTrackButton from "./player/nextTrackButton"
import PrevTrackButton from "./player/prevTrackButton"
import ArtistAndTrack from "./player/artistAndTrack"

let timer

type Props = {
  accessToken: string,
  uri: string | null
}

const Player = (props: Props) => {
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [spotifyPlayer, setSpotifyPlayer] = useState(null)

  const [position, setPosition] = useState(0)
  const positionRef = useRef(position)
  positionRef.current = position

  const [trackNum, setTrackNum] = useState(0)
  const [artist, setArtist] = useState("")
  const [album, setAlbum] = useState("")
  const [trackTitle, setTrackTitle] = useState("")
  const [trackDuration, setTrackDuration] = useState(0)
  const [albumImageURL, setAlbumImageURL] = useState("")

  let uri = null
  if (props.uri !== null) uri = `spotify:album:${props.uri}`

  const setupPlayer = () => {
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
  }

  React.useEffect(() => {
    if (window.Spotify) {
      if (!isReady && props.accessToken) {
        setupPlayer()
      }
      setIsReady(true)
    }
  })

  React.useEffect(() => {
    if (!isPlaying) {
      clearTimeout(timer)
    }
  }, [timer])

  React.useEffect(() => {
    if (uri && isReady) {
      onStartPlay()
    }
  }, [uri])

  const onStartPlay = () => {
    clearTimeout(timer)
    spotifyPlayer.play(uri, 0, 0).then(() => {
      progressTick()
      setIsPlaying(true)
    })
  }

  const onTogglePlay = () => {
    if (!isPlaying) {
      spotifyPlayer.play(uri, trackNum, position).then(() => {
        setIsPlaying(!isPlaying)
        progressTick()
      })
    } else {
      spotifyPlayer.pause().then(() => {
        setIsPlaying(!isPlaying)
        clearTimeout(timer)
      })
    }
  }

  const onRequestNextTrack = () => {
    if (isPlaying) {
      spotifyPlayer.play(uri, trackNum + 1, 0)
    }
    setPosition(0)
    setTrackNum(trackNum + 1)
  }

  const onRequestPrevTrack = () => {
    if (trackNum == 0) return

    if (isPlaying) {
      spotifyPlayer.play(uri, trackNum - 1, 0)
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
      spotifyPlayer.play(uri, trackNum, newPosition)
    }
  }

  return (
    <div className="w-full bg-gray-200 border-t-1 border-gray-400 shadow flex flex-row pt-2 px-8 h-32">
      <div
        className="absolute h-24 w-24 bg-cover rounded overflow-hidden bg-gray-500"
        style={{ backgroundImage: `url(${albumImageURL})` }}
      />

      <div className="flex flex-row flex-wrap w-full">
        <div className="w-full pl-32 relative md:absolute">
          <ArtistAndTrack artist={artist} trackTitle={trackTitle} />
          <p className="font-bold text-gray-600">{album}</p>
        </div>

        <div className="w-full flex justify-center items-center pl-32 md:pl-0">
          <div className="w-full md:w-1/3">
            <div className="w-full flex flex-row justify-around items-center mb-4">
              <PrevTrackButton
                disabled={uri === null}
                onClick={onRequestPrevTrack}
              />
              <PlayButton
                disabled={uri === null}
                isPlaying={isPlaying}
                onClick={onTogglePlay}
              />
              <NextTrackButton
                disabled={uri === null}
                onClick={onRequestNextTrack}
              />
            </div>

            <ProgressBar
              percentage={position / trackDuration}
              onClick={progressClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
