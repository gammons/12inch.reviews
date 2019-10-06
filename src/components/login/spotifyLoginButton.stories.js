// @flow
import * as React from "react"
import { storiesOf } from "@storybook/react"

import SpotifyLoginButton from "./spotifyLoginButton"

storiesOf("Buttons", module).add("spotify login", () => {
  return (
    <div className="p-8">
      <SpotifyLoginButton onClick={() => console.log("click")} />
    </div>
  )
})
