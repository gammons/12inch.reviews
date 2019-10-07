// @flow
import * as React from "react"
import { storiesOf } from "@storybook/react"

import Header from "./header"

storiesOf("Header", module)
  .add("No user", () => {
    return <Header />
  })
  .add("User", () => {
    return <Header user={{ something: true }} />
  })
