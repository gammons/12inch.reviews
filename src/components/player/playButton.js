// @flow
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"

const PlayButton = props => {
  return props.isPlaying ? (
    <a onClick={props.onClick}>
      <FontAwesomeIcon icon={faPause} />
    </a>
  ) : (
    <a onClick={props.onClick}>
      <FontAwesomeIcon icon={faPlay} />
    </a>
  )
}

export default PlayButton
