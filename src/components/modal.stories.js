// @flow
import React, { useState } from "react"
import { storiesOf } from "@storybook/react"

import Modal from "./modal"

const OuterModal = props => {
  const [isOpen, setIsOpen] = useState(props.isOpen || false)

  const onToggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <React.Fragment>
      <a className="cursor-pointer" onClick={onToggleOpen}>
        Open
      </a>
      <Modal isOpen={isOpen} onClose={onToggleOpen}>
        {props.children}
      </Modal>
    </React.Fragment>
  )
}

storiesOf("Modal", module).add("Simple", () => {
  return (
    <div className="p-4 border border-blue-500">
      <OuterModal isOpen={true}>
        <div className="p-8 m-4">
          <p>Inside the modal</p>
        </div>
      </OuterModal>
    </div>
  )
})
