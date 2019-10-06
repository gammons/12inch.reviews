// @flow
import * as React from "react"
import { storiesOf } from "@storybook/react"

import SearchBar from "./searchBar"

storiesOf("Search Bar", module).add("basic", () => {
  return <SearchBar />
})
