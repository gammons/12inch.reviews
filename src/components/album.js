// @flow
import React from "react"

const Album = props => {
  const album = props.album

  return (
    <div className="max-w-2xl">
      <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded flex flex-row leading-normal">
        <div
          className="h-64 w-64 flex-none bg-cover rounded-t lg:rounded-t-none md:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${album.image_url})` }}
        />

        <div className="p-4 w-full flex flex-col">
          <p className="text-black font-bold text-xl">{album.artist}</p>
          <p className="text-gray-700 font-bold">{album.title}</p>
          <p className="text-gray-600">
            Rating: <span className="font-bold">{album.rating}</span>
          </p>
          <p className="text-gray-800 text-base mt-3">{album.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Album
