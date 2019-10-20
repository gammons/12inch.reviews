// @flow
const AlbumSearch = (albums, search) => {
  let filtered = albums

  if (search.artist !== "") {
    if (search.artist.split(" ").length == 1) {
      filtered = filtered.filter(a => {
        return (
          a.artist &&
          a.artist
            .split(" ")
            .some(name =>
              name.toLowerCase().startsWith(search.artist.toLowerCase())
            )
        )
      })
    } else {
      filtered = filtered.filter(a => {
        return (
          a.artist &&
          a.artist.toLowerCase().startsWith(search.artist.toLowerCase())
        )
      })
    }
  }

  if (search.genre !== "") {
    filtered = filtered.filter(a => a.genre && a.genre === search.genre)
  }

  if (search.rating !== "") {
    filtered = filtered.filter(
      a => a.rating && parseFloat(a.rating) >= search.rating
    )
  }

  if (search.sort === "Rating") {
    filtered = filtered.sort(
      (a1, a2) => parseFloat(a2.rating) - parseFloat(a1.rating)
    )
  } else if (search.sort === "Created") {
    filtered = filtered.sort((a1, a2) => a2.timestamp - a1.timestamp)
  }

  return filtered
}

export default AlbumSearch
