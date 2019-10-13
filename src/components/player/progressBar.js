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
      className="border border-gray-400 shadow w-full rounded-sm cursor-pointer"
      onClick={onClick}
      ref={r => (bar = r)}
    >
      <div
        className="bg-gray-800 text-xs leading-none py-1 text-center text-white"
        style={{
          width: `${(props.percentage || 0) * 100}%`,
          transition: "all 0.5s linear"
        }}
      />
    </div>
  )
}

export default ProgressBar
