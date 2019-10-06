// @flow
import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const Modal = props => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div
        style={{ display: props.isOpen ? "flex" : "none" }}
        className="bg-gray-900 opacity-75 h-screen w-full absolute flex items-center justify-center"
      >
        <div className="bg-white rounded shadow p-4 max-w-xs max-h-full text-center">
          <div className="flex flex-row-reverse">
            <a
              onClick={props.onClose}
              className="cursor-pointer text-2xl text-gray-600"
            >
              <FontAwesomeIcon icon={faTimes} />
            </a>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Modal
