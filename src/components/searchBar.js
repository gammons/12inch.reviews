// @flow
import React, { useState, useRef } from "react"
import { debounce } from "debounce"

const SearchBar = props => {
  const cssVars =
    "border-2 border-gray-300 bg-white h-12 px-5 text-gray-700 rounded-lg focus:outline-none w-full"
  const labelVars = "text-gray-500 block text-xs uppercase font-bold"

  const [searchValue, setSearchValue] = useState("")
  const [genreValue, setGenreValue] = useState("")
  const [ratingValue, setRatingValue] = useState("1.0")
  const [sortValue, setSortValue] = useState("created")

  const debouncedSearch = useRef(debounce(props.onSearch, 1000))

  const artistRef = useRef(null)
  const genreRef = useRef(null)
  const ratingRef = useRef(null)
  const sortRef = useRef(null)

  const doSearch = () => {
    debouncedSearch.current({
      artist: artistRef.current.value,
      genre: genreRef.current.value,
      rating: ratingRef.current.value,
      sort: sortRef.current.value
    })
  }

  const onChangeArtist = ev => {
    setSearchValue(ev.target.value)
    doSearch()
  }

  const onChangeGenre = ev => {
    setGenreValue(ev.target.value)
    doSearch()
  }

  const onChangeRating = ev => {
    setRatingValue(ev.target.value)
    doSearch()
  }

  const onChangeSort = ev => {
    setSortValue(ev.target.value)
    doSearch()
  }

  return (
    <div className="w-full bg-gray-200 p-4 px-8 flex flex-row flex-wrap">
      <div className="p-2 w-1/2 md:w-6/12">
        <label className={labelVars}>Search:</label>
        <input
          className="border-2 border-gray-300 bg-white h-12 px-5 text-gray-700 rounded-lg focus:outline-none w-full"
          type="search"
          ref={artistRef}
          placeholder="Artist or album"
          value={searchValue}
          onChange={onChangeArtist}
        />
      </div>

      <div className="p-2 w-1/2 md:w-2/12">
        <label className={labelVars}>Genre:</label>
        <select
          ref={genreRef}
          className={cssVars}
          value={genreValue}
          onChange={onChangeGenre}
        >
          <option value="">All genres</option>
          <option>Electronic</option>
          <option>Experimental</option>
          <option>Folk/Country</option>
          <option>Jazz</option>
          <option>Metal</option>
          <option>Pop/R&B</option>
          <option>Rap</option>
          <option>Rock</option>
          <option>Unknown</option>
        </select>
      </div>

      <div className="p-2 w-1/2 md:w-2/12">
        <label className={labelVars}>Rating above:</label>
        <input
          className={cssVars}
          ref={ratingRef}
          value={ratingValue}
          onChange={onChangeRating}
          type="number"
          step="0.5"
          min="1"
          max="10"
        />
      </div>

      <div className="p-2 w-1/2 md:w-2/12">
        <label className={labelVars}>Sort:</label>
        <select
          value={sortValue}
          onChange={onChangeSort}
          ref={sortRef}
          className={cssVars}
        >
          <option>Created</option>
          <option>Rating</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar
