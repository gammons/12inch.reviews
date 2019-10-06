// @flow
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faBookOpen } from "@fortawesome/free-solid-svg-icons"

const HighRating = 8

const Rating = props => {
  if (props.rating >= HighRating) {
    return <span className="font-bold text-red-600">{props.rating}</span>
  } else {
    return <span className="font-bold text-gray-900">{props.rating}</span>
  }
}

const Album = props => {
  const album = props.album

  const onPlayAlbum = () => {
    props.onPlay(album.spotify_album_id)
    return false
  }

  return (
    <div className="max-w-2xl">
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded flex flex-row leading-normal">
        <div
          className="h-64 w-64 flex-none bg-cover rounded-t lg:rounded-t-none md:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${album.image_url})` }}
        />

        <div className="flex flex-col justify-between">
          <div className="p-4 w-full flex flex-col">
            <p className="text-black font-bold text-xl">{album.artist}</p>
            <p className="text-gray-700 font-bold">{album.title}</p>
            <p className="text-gray-600 text-xl">
              Rating: <Rating rating={album.rating} />
            </p>
            <p
              className="text-gray-900 text-base mt-3"
              style={{
                maxHeight: 75,
                overflow: "hidden"
                // textOverflow: "ellipsis",
                // whiteSpace: "nowrap"
              }}
            >
              {album.description}
            </p>
          </div>

          <hr />

          <div className="p-4 flex flex-row justify-around text-gray-700">
            <a className="cursor-pointer" onClick={onPlayAlbum}>
              <FontAwesomeIcon icon={faPlay} /> Play album
            </a>
            <a href="#" target="_blank" href={album.url}>
              <FontAwesomeIcon icon={faBookOpen} /> Read review
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Album
