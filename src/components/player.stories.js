// @flow
import * as React from "react"
import { storiesOf } from "@storybook/react"

import Player from "./player"
import SpotifyLogin from "./spotifyLogin"

storiesOf("Player", module)
  .add("simple", () => {
    const token =
      "BQBZuloBmn5YHbmJ3pfXAOh_gDROO95aM08CNkthIcGUbc31Bg-Dgk1XS65OOlqexVlV99YbEmCND_GyIQNq2Mwgjnkhdq9Byb_aUgHHBtymtN0qZ22zMM3MzvrJzdIf1VgrOenfl7ryw7S_S-vsYpINg1q0VMJFmFE9Wfg"
    return (
      <Player
        accessToken={token}
        uri={"spotify:album:3DrgM5X3yX1JP1liNLAOHI"}
      />
    )
  })
  .add("login", () => {
    return <SpotifyLogin />
  })
