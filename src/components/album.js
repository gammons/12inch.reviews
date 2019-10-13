// @flow
import React from "react"
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
  playDisabled: boolean,
  onPlay: (albumId: string) => void
}

const Album = (props: Props) => {
  const album = props.album

  const onPlayAlbum = () => {
    props.onPlay(album.spotify_album_id)
    return false
  }

  return (
    <div className="w-full max-w-2xl md:p-4">
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded flex flex-row leading-normal">
        <div
          className="absolute md:static h-24 w-24 md:h-64 md:w-64 flex-none bg-cover rounded-t lg:rounded-t-none md:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${album.image_url})` }}
        />

        <div className="flex flex-col justify-between">
          <div className="p-4 w-full flex flex-col">
            <div className="pl-24 md:pl-0">
              <p className="text-black font-bold text-xl">{album.artist}</p>
              <p className="text-gray-700 font-bold">{album.title}</p>
              <p className="text-gray-600 text-xl flex flex-col sm:flex-row justify-between">
                <span>
                  Rating: <Rating rating={album.rating} />
                </span>
                <span>{album.genre}</span>
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
