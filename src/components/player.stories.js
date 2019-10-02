// @flow
import * as React from "react"
import { storiesOf } from "@storybook/react"

import Player from "./player"
import SpotifyLogin from "./spotifyLogin"

storiesOf("Player", module)
  .add("simple", () => {
    const token =
      "BQD0HrhS8XhyLIJgEAkYIHA9C1kCUcwWbzzSB7nOjRCFUa5G77JT44IrwkJlIdBxTaorQbppgC88ggYIaXrqa9Y7Yw6j1IKIc9n9cNt09l3kAOh9OtDuPArNDJQM4ICWCgb0EP9ypr9qDkvuGpvczALkkjov_S3Z3g"
    return (
      <Player
        accessToken={token}
        uri={"spotify:track:1nXCcO9Fp1mE0rzw39qOPY"}
      />
    )
  })
  .add("login", () => {
    return <SpotifyLogin />
  })
