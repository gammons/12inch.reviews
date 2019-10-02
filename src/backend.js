import Album from "./models/album"

const BackendUrl = "https://pitchfork.com"

export const getAlbums = () => {
  apiRequest("/reviews.json", "GET").then(albums => {
    albums.forEach(albumData => {
      const album = new Album()
      album.id = albumData.id
      album.timestamp = albumData.timestamp
      album.title = albumData.title
      album.artistName = albumData.artistName
      album.rating = albumData.rating
      album.bnm = albumData.bnm
      album.bnr = albumData.bnr
      album.label = albumData.label
      album.url = albumData.url
      album.description = albumData.description
      album.genre = albumData.genre
      album.imageUrl = albumData.image_url
    })
  })
}

export const apiRequest = (
  path: string,
  method: string,
  params: object = {}
) => {
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
