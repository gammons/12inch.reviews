// @flow
import React from "react"

const Footer = props => {
  return (
    <div className="w-full bg-gray-300 px-8 p-2 border-b-1 border-gray-400 shadow flex flex-row justify-center items-center">
      <p>
        A simple,{" "}
        <a
          className="underline text-gray-600"
          target="_blank"
          href="https://github.com/gammons/12inch.reviews"
        >
          open-source
        </a>{" "}
        side project by{" "}
        <a
          className="underline text-gray-600"
          target="_blank"
          href="https://twitter.com/gammons"
        >
          Grant Ammons
        </a>
      </p>
    </div>
  )
}

export default Footer
