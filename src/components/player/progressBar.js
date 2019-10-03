// @flow
import React, { useState } from "react"

const ProgressBar = props => {
  let bar

  const onClick = ev => {
    let left = bar.offsetLeft
    const x = ev.pageX - left
    props.onClick(x / bar.offsetWidth)
  }

  return (
    <div
      className="border border-gray-400 shadow w-full rounded-sm"
      onClick={onClick}
      style={{ transition: "all 1s" }}
      ref={r => (bar = r)}
    >
      <div
        className="bg-gray-800 text-xs leading-none py-2 text-center text-white"
        style={{
          width: `${(props.percentage || 0) * 100}%`
        }}
      />
    </div>
  )
}

export default ProgressBar
