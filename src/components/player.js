// @flow
import React, { useState, useRef } from "react"
import { debounce } from "debounce"

import SpotifyPlayer from "../models/spotifyPlayer"
import PlayButton from "./player/playButton"
import ProgressBar from "./player/progressBar"
import NextTrackButton from "./player/nextTrackButton"
import PrevTrackButton from "./player/prevTrackButton"
import ArtistAndTrack from "./player/artistAndTrack"
import VolumeSlider from "./player/volumeSlider"

type Props = {
  uri: string | null
}

const Player = (props: Props) => {
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [spotifyPlayer, setSpotifyPlayer] = useState(null)
  const timer = useRef(null)

  const [position, setPosition] = useState(0)
  const positionRef = useRef(position)
  positionRef.current = position

  const [trackNum, setTrackNum] = useState(0)
  const [hasNextTrack, setHasNextTrack] = useState(false)
  const [artist, setArtist] = useState("")
  const [album, setAlbum] = useState("")
  const [trackTitle, setTrackTitle] = useState("")
  const [trackDuration, setTrackDuration] = useState(0)
  const [albumImageURL, setAlbumImageURL] = useState("")
  const [volume, setVolume] = useState(0.7)
  const volumeRef = useRef(null)

  let uri = null
  if (props.uri !== null) uri = `spotify:album:${props.uri}`

  const setupPlayer = () => {
    const aPlayer = new window.Spotify.Player({
      name: "12inch.reviews Player",
      volume,
      getOauthToken: props.accessTokenFn
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
      setTrackNum(state.track_window.previous_tracks.length)
      setHasNextTrack(state.track_window.next_tracks.length > 0)
      setPosition(state.position)

      setIsPlaying(!state.paused)

      if (state.paused) {
        clearTimeout(timer.current)
        timer.current = null
      } else if (!timer.current) {
        progressTick()
      }
    })

    aPlayer.addListener("ready", ret => {
      const player = new SpotifyPlayer(ret.device_id, props.accessTokenFn)
      setSpotifyPlayer(player)
      volumeRef.current = debounce(val => {
        aPlayer.setVolume(val)
      }, 500)
    })

    aPlayer.connect()
  }

  React.useEffect(() => {
    const readyLoop = () => {
      if (window.Spotify) {
        setupPlayer()
        setIsReady(true)
      } else {
        setTimeout(readyLoop, 1000)
      }
    }
    readyLoop()
  }, [])

  React.useEffect(() => {
    if (!isPlaying) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }, [timer.current])

  React.useEffect(() => {
    if (uri && isReady) {
      onStartPlay()
    }
  }, [uri])

  const onStartPlay = () => {
    clearTimeout(timer.current)
    spotifyPlayer.play(uri, 0, 0).then(() => {
      progressTick()
      setIsPlaying(true)
      setTrackNum(0)
      setPosition(0)
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
        clearTimeout(timer.current)
        timer.current = null
      })
    }
  }

  const onRequestNextTrack = () => {
    if (!hasNextTrack) return
    if (isPlaying) {
      spotifyPlayer.play(uri, trackNum + 1, 0)
    }
    setPosition(0)
    setTrackNum(trackNum + 1)
  }

  const onRequestPrevTrack = () => {
    const trackToPlay = trackNum === 0 ? 0 : trackNum - 1

    if (isPlaying) {
      spotifyPlayer.play(uri, trackToPlay, 0)
    }
    setPosition(0)
    setTrackNum(trackToPlay)
  }

  const onSetVolume = ev => {
    volumeRef.current(ev.target.value)
    setVolume(ev.target.value)
  }

  const progressTick = () => {
    setPosition(positionRef.current + 1000)
    timer.current = setTimeout(progressTick, 1000)
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
        className="my-2 absolute h-24 w-24 bg-cover rounded overflow-hidden bg-gray-500"
        style={{ backgroundImage: `url(${albumImageURL})` }}
      />

      <div className="md:flex flex-row flex-wrap w-full">
        <div className="pl-32 relative md:absolute">
          <ArtistAndTrack
            artist={artist}
            trackTitle={trackTitle}
            album={album}
          />
        </div>

        <div className="w-full flex flex-wrap justify-around items-center pl-32 md:pl-0">
          <div></div>
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
                disabled={uri === null || !hasNextTrack}
                onClick={onRequestNextTrack}
              />
            </div>
            <ProgressBar
              percentage={position / trackDuration}
              onClick={progressClick}
            />
          </div>
          <div className="w-full md:w-0 my-4 flex justify-center md:justify-start">
            <VolumeSlider onSetVolume={onSetVolume} volume={volume} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
