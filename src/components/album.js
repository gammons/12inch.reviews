// @flow
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faBookOpen } from "@fortawesome/free-solid-svg-icons"

import AlbumModel from "../models/user"

const HighRating = 8

const Rating = (props: { rating: number }) => {
  if (props.rating >= HighRating) {
    return <span className="font-bold text-red-600">{props.rating}</span>
  } else {
    return <span className="font-bold text-gray-900">{props.rating}</span>
  }
}

type Props = {
  album: AlbumModel,
  onPlay: (albumId: string) => void
}

const Album = (props: Props) => {
  const album = props.album
  const [showPlay, setShowPlay] = useState(false)

  const onPlayAlbum = () => {
    props.onPlay(album.spotify_album_id)
    return false
  }

  const showPlayButton = () => {
    setShowPlay(true)
  }

  const hidePlayButton = () => {
    setShowPlay(false)
  }

  return (
    <div className="w-full max-w-2xl md:p-4">
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-grey-light bg-white md:rounded flex flex-row leading-normal">
        <div
          onMouseOver={showPlayButton}
          onMouseOut={hidePlayButton}
          className="absolute md:static h-24 w-24 md:h-64 md:w-64 flex-none bg-cover rounded-t lg:rounded-t-none my-8 md:my-0 md:rounded-l text-center overflow-hidden flex items-center justify-center"
          style={{ backgroundImage: `url(${album.image_url})` }}
        >
          <a
            onClick={onPlayAlbum}
            className={`cursor-pointer text-4xl z-10 bg-white rounded px-4 py-1 ${!showPlay &&
              "hidden"}`}
          >
            <FontAwesomeIcon icon={faPlay} />
          </a>
        </div>

        <div className="flex flex-col justify-between">
          <div className="p-4 w-full flex flex-col">
            <div className="pl-24 md:pl-0">
              <div className="text-black font-bold text-xl flex flex-col sm:flex-row justify-between">
                <span>{album.artist}</span>
                <span className="text-gray-500 text-sm">
                  {album.prettyReviewDate()}
                </span>
              </div>

              <div className="text-gray-700 font-bold flex flex-col sm:flex-row justify-between">
                <span className="text-gray-700 font-bold">{album.title}</span>
                <span className="text-gray-700">{album.genre}</span>
              </div>

              <p className="text-gray-600 text-xl">
                Rating: <Rating rating={album.rating} />{" "}
              </p>
            </div>

            <p
              className="text-gray-900 text-base mt-3"
              style={{
                maxHeight: 73,
                minHeight: 73,
                overflow: "hidden"
              }}
            >
              {album.description}
            </p>
          </div>

          <div className="p-4 flex flex-row justify-around text-gray-700">
            <a
              className={props.disabled ? "text-gray-500" : "cursor-pointer"}
              onClick={onPlayAlbum}
            >
              <FontAwesomeIcon icon={faPlay} />{" "}
              <span className="hidden md:inline">Play album</span>
            </a>
            <a href="#" target="_blank" href={album.url}>
              <FontAwesomeIcon icon={faBookOpen} />{" "}
              <span className="hidden md:inline">Read review</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Album
