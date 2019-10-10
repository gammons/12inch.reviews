// @flow
import * as React from "react"
import { storiesOf } from "@storybook/react"

import SpotifyLoginButton from "./spotifyLoginButton"

storiesOf("Components", module).add("spotify login button", () => {
  return (
    <div className="p-8">
      <SpotifyLoginButton onClick={() => console.log("click")} />
    </div>
  )
})
