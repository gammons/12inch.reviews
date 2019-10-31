// @flow
import AlbumModel from "../models/album"

export default class IndexStore {
  initialize() {
    return new Promise(resolve => {
      const req = window.indexedDB.open("albums", 1)
      req.onerror = event => console.error(event)

      req.onsuccess = event => {
        this.db = event.target.result
        resolve()
      }

      req.onupgradeneeded = event => {
        this.db = event.target.result
        if (!this.db.objectStoreNames.contains("albums")) {
          this.setupSchema()
        }
        resolve()
      }
    })
  }

  count() {
    return new Promise(resolve => {
      const store = this.db
        .transaction(["albums"], "readonly")
        .objectStore("albums")
      resolve(store.count())
    })
  }

  fetch() {
    return new Promise(resolve => {
      const store = this.db
        .transaction(["albums"], "readonly")
        .objectStore("albums")

      store.index("timestamp").getAll().onsuccess = event => {
        resolve(event.target.result.map(album => new AlbumModel(album)))
      }
    })
  }

  clear() {
    return new Promise(resolve => {
      const txn = this.db.transaction(["albums"], "readwrite")
      txn.oncomplete = () => {
        resolve()
      }
      txn.objectStore("albums").clear()
    })
  }

  add(albums: Array<AlbumModel>) {
    const store = this.db
      .transaction(["albums"], "readwrite")
      .objectStore("albums")

    albums.forEach(album => store.add(album))
  }

  save(albums: Array<AlbumModel>) {
    this.clear().then(() => {
      const store = this.db
        .transaction(["albums"], "readwrite")
        .objectStore("albums")

      albums.forEach(album => store.add(album))
    })
  }

  setupSchema() {
    const objectStore = this.db.createObjectStore("albums", {
      keyPath: "spotify_album_id"
    })
    objectStore.createIndex("artist", "artist", { unique: false })
    objectStore.createIndex("title", "title", { unique: false })
    objectStore.createIndex("timestamp", "timestamp", { unique: false })
  }
}
