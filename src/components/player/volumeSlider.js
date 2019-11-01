// @flow
import React from "react"

type Props = {
  volume: number,
  onSetVolume: (val: number) => void
}

const VolumeSlider = (props: Props) => {
  return (
    <div>
      <input
        type="range"
        list="tickmarks"
        min={0}
        max={1}
        step={0.1}
        onChange={props.onSetVolume}
        value={props.volume}
      />
      <datalist id="tickmarks">
        <option value="0" label="0%" />
        <option value="0.1" />
        <option value="0.2" />
        <option value="0.3" />
        <option value="0.4" />
        <option value="0.5" label="50%" />
        <option value="0.6" />
        <option value="0.7" />
        <option value="0.8" />
        <option value="0.9" />
        <option value="1.0" label="100%" />
      </datalist>
    </div>
  )
}

export default VolumeSlider
