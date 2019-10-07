// @flow
import * as React from "react"
import { storiesOf } from "@storybook/react"

import SearchBar from "./searchBar"

storiesOf("Static components", module).add("Search bar", () => {
  return <SearchBar />
})
