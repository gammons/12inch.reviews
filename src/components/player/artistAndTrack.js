// @flow
import React from "react"

type Props = {
  artist: string,
  album: string,
  trackTitle: string
}

const ArtistAndTrack = (props: Props) => {
  if (!props.artist && !props.trackTitle) return null

  return (
    <div className="text-sm md:text-lg">
      <span className="font-bold">{props.trackTitle}</span>
      <br />
      <span>{props.artist}</span>
    </div>
  )
}

export default ArtistAndTrack
