// @flow
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faStepBackward } from "@fortawesome/free-solid-svg-icons"

const PrevTrackButton = props => {
  return (
    <a
      className={`text-2xl ${
        props.disabled ? "text-gray-500" : "cursor-pointer"
      }`}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faStepBackward} />
    </a>
  )
}

export default PrevTrackButton
