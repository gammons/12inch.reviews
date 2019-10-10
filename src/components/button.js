// @flow
import React from "react"

const Button = props => {
  return (
    <button
      onClick={props.onClick}
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {props.children}
    </button>
  )
}

export default Button
