// @flow
import React from "react"

type Props = {
  artist: string,
  album: string,
  trackTitle: string
}

const ArtistAndTrack = (props: Props) => {
  const val =
    props.artist && props.trackTitle
      ? `${props.artist} - ${props.trackTitle}`
      : ""
  return (
    <div className="text-lg font-bold">
      {val}
      <p className="inline font-bold text-gray-600">{props.album}</p>
    </div>
  )
}

export default ArtistAndTrack
