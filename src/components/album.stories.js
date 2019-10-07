// @flow
import React, { useState } from "react"
import { storiesOf } from "@storybook/react"

import Album from "./album"
import AlbumModel from "../models/album"

const onPlay = albumID => {
  console.log("will play", albumID)
}

const AlbumShower = () => {
  const [data, setData] = useState(null)
  React.useEffect(() => {
    fetch("./albums.json")
      .then(data => data.json())
      .then(setData)
  }, [])

  console.log("data = ", data)

  if (!data) return null

  return data.albums.map(album => <Album onPlay={onPlay} album={album} />)
}

storiesOf("Album", module).add("simple", () => {
  return (
    <div className="bg-gray-100 p-4 flex flex-row flex-wrap">
      <AlbumShower />
    </div>
  )
})
