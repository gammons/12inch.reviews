// @flow
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faStepForward } from "@fortawesome/free-solid-svg-icons"

const NextTrackButton = props => {
  return (
    <a
      className={`text-2xl ${
        props.disabled ? "text-gray-500" : "cursor-pointer"
      }`}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faStepForward} />
    </a>
  )
}

export default NextTrackButton
