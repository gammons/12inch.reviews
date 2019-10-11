// @flow
import React from "react"

const Button = props => {
  return (
    <div>
      <button
        onClick={props.onClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
      >
        {props.children}
      </button>
    </div>
  )
}

export default Button
