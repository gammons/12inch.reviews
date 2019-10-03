// @flow
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"

const PlayButton = props => {
  return props.isPlaying ? (
    <a className="text-2xl" onClick={props.onClick}>
      <FontAwesomeIcon icon={faPause} />
    </a>
  ) : (
    <a className="text-2xl" onClick={props.onClick}>
      <FontAwesomeIcon icon={faPlay} />
    </a>
  )
}

export default PlayButton
