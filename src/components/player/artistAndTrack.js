// @flow
import React from "react"

type Props = {
  artist: string,
  trackTitle: string
}

const ArtistAndTrack = (props: Props) => {
  const val =
    props.artist && props.trackTitle
      ? `${props.artist} - ${props.trackTitle}`
      : ""
  return <div className="text-lg font-bold">{val}</div>
}

export default ArtistAndTrack
