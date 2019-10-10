// @flow
import React from "react"

import Button from "./button"

const SearchBar = props => {
  const cssVars =
    "border-2 border-gray-300 bg-white h-12 px-5 text-gray-700 rounded-lg focus:outline-none w-full md:w-48"
  const labelVars = "text-gray-500 block text-xs uppercase font-bold"
  return (
    <div className="w-full bg-gray-200 p-4 px-8 flex flex-row flex-wrap">
      <div className="w-full lg:w-4/12 py-1">
        <label className={labelVars}>Search:</label>
        <input
          className="border-2 border-gray-300 bg-white h-12 px-5 text-gray-700 rounded-lg focus:outline-none w-full"
          type="search"
          placeholder="Artist or album"
        />
      </div>

      <div className="w-full lg:w-8/12 flex flex-row flex-wrap">
        <div className="w-full sm:w-48 py-1 md:mx-4">
          <label className={labelVars}>Genre:</label>
          <select className={cssVars}>
            <option>All genres</option>
            <option>Rock</option>
            <option>Electronic</option>
          </select>
        </div>

        <div className="w-full sm:w-48 py-1 md:mr-4">
          <label className={labelVars}>Rating above:</label>
          <input
            className={cssVars}
            type="number"
            defaultValue="1.0"
            step="0.5"
            min="1"
            max="10"
          />
        </div>

        <div className="w-full sm:w-48 py-1 md:mr-4">
          <label className={labelVars}>Sort:</label>
          <select className={cssVars}>
            <option>Created</option>
            <option>Rating</option>
          </select>
        </div>

        <div className="w-full sm:w-48 flex flex-col justify-end py-1">
          <Button>Search</Button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
