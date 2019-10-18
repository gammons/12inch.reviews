// @flow
import React from "react"

const Footer = props => {
  return (
    <div className="hidden sm:block w-full bg-blue-100 px-8 p-2 border-b-1 border-gray-400 shadow text-center">
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
    </div>
  )
}

export default Footer
