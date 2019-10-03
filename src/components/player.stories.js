// @flow
import * as React from "react"
import { storiesOf } from "@storybook/react"

import Player from "./player"
import SpotifyLogin from "./spotifyLogin"

storiesOf("Player", module)
  .add("simple", () => {
    return (
      <Player
        accessToken={process.env.SPOTIFY_TOKEN}
        uri={"spotify:album:3DrgM5X3yX1JP1liNLAOHI"}
      />
    )
  })
  .add("login", () => {
    return <SpotifyLogin />
  })
