// @flow
import AlbumFetcher from "./albumFetcher"

export default class AlbumStore {
  constructor(metadata) {
    this.metadata = metadata
    this.albumFetcher = new AlbumFetcher(metadata)
  }

  initialize() {
    return new Promise(resolve => {
      this.albumFetcher.fetchFirst().then(data => {
        const req = window.indexedDB.open("albums", this.metadata.timestamp)
        req.onerror = event => console.error(event)

        req.onsuccess = event => {
          //const db = event.target.result
          console.log("onsuccess", event.target)
          this.db = event.target.result

          resolve()
        }

        // needs to handle 2 cases
        // 1. empty DB
        // 2. DB that needs upgrade
        req.onupgradeneeded = event => {
          console.log("onupgradeneeded")

          this.db = event.target.result

          if (!this.db.objectStoreNames.contains("albums")) {
            this.setupSchema()
          }

          const store = event.target.transaction.objectStore("albums")
          data.forEach(album => store.add(album))
          resolve()
        }
      })
    })
  }

  getAlbums() {
    console.log("getAlbums")
    const store = this.db
      .transaction(["albums"], "readonly")
      .objectStore("albums")
    store.index("timestamp").openCursor().onsuccess = event => {
      console.log("event = ", event)
      const cursor = event.target.result
      this.readyFn(cursor)
    }
  }

  fetchMore() {}

  setupSchema() {
    console.log("setupSchema")
    const objectStore = this.db.createObjectStore("albums", {
      keyPath: "spotify_album_id"
    })
    objectStore.createIndex("artist", "artist", { unique: false })
    objectStore.createIndex("title", "title", { unique: false })
    objectStore.createIndex("timestamp", "timestamp", { unique: false })
  }
}
