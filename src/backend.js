import Album from "./models/album"

const BackendUrl = "https://pitchfork.com"

export const getAlbums = () => {
  return apiRequest("/api/v2/search", "GET", {
    types: "reviews",
    sort: "publishdate desc, position asc",
    hierarchy: "sections/reviews/albums,channels/reviews/albums",
    size: 12,
    start: 0
  }).then(data => {
    return data.results.list.map(res => {
      const album = new Album()
      album.id = res.id
      album.timestamp = res.timestamp
      album.title = res.title
      album.artistName = res.artists[0].display_name
      album.rating = res.tombstone.albums[0].rating.display_rating
      album.bnm = res.tombstone.albums[0].rating.bnm
      album.bnr = res.tombstone.albums[0].rating.bnr
      album.label =
        res.tombstone.albums[0].labels_and_years[0].labels[0].display_name
      album.url = res.url
      album.description = res.socialDescription
      album.genre = res.genres[0].display_name
      return album
    })
  })
}

const apiRequest = (path: string, method: string, params: object = {}) => {
  return new Promise((resolve, reject) => {
    const headers = new Headers()

    headers.append("Accept", "application/json")

    interface OptsInterface {
      headers: Headers;
      mode: RequestMode;
      method: string;
      body?: string;
    }
    const opts: OptsInterface = { headers, method }

    let url = `${BackendUrl}/${path}`

    if (process.env.NODE_ENV !== "production") {
      console.log("******************************")
      console.log("API request: ", url)
      console.log("API method: ", method)
      console.log("API params: ", params)
      console.log("******************************")
    }

    if (method === "GET") {
      url += `?${toQueryString(params)}`
    } else {
      opts.body = JSON.stringify(params)
    }

    fetch(url, opts)
      .then(resp => {
        if (resp.status !== 200) {
          reject(resp.statusText)
        }
        return resp.json()
      })
      .then(json => resolve(json))
      .catch(error => {
        reject(error)
      })
  })
}

const toQueryString = (obj: object) => {
  const parts = []
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]))
    }
  }
  return parts.join("&")
}
