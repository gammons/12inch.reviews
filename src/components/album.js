// @flow
import React from "react"

const Album = props => {
  const album = props.album

  return (
    <div>
      <img src={album.image_url} />
      <p>{album.description}</p>
    </div>
  )
}

export default Album
