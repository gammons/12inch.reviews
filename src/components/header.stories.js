// @flow
import * as React from "react"
import { storiesOf } from "@storybook/react"

import Header from "./header"
import Footer from "./footer"

storiesOf("Header", module)
  .add("No user", () => {
    return <Header />
  })
  .add("User", () => {
    return <Header user={{ something: true }} />
  })

storiesOf("Footer", module).add("footer", () => {
  return <Footer />
})
