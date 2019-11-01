// @flow
import React from "react"

import "./range.css"

type Props = {
  volume: number,
  onSetVolume: (val: number) => void
}

const VolumeSlider = (props: Props) => {
  return (
    <div>
      <input
        className="range"
        type="range"
        min={0}
        max={1}
        step={0.1}
        onChange={props.onSetVolume}
        value={props.volume}
      />
    </div>
  )
}

export default VolumeSlider
