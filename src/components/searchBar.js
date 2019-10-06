// @flow
import React from "react"

const SearchBar = props => {
  return (
    <div className="w-full bg-gray-200 p-8 flex flex-row">
      <input
        className="border-2 border-gray-300 bg-white h-12 px-5 pr-8 mx-4 text-gray-700 rounded-lg focus:outline-none"
        type="search"
        placeholder="Search artists..."
      />

      <select
        class="border-2 border-gray-300 bg-white h-12 py-3 px-5 pr-8 mx-4 text-gray-700 rounded-lg focus:outline-none"
        id="grid-state"
      >
        <option>All genres</option>
        <option>Rock</option>
        <option>Electronic</option>
      </select>

      <div>
        <label>Rating:</label>
        <input
          className="border-2 border-gray-300 bg-white h-24 px-5 pr-8 mx-4 text-gray-700 rounded-lg focus:outline-none"
          type="range"
          min="1"
          step="1"
          max="10"
        />
      </div>
    </div>
  )
}

export default SearchBar
