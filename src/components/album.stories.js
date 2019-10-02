// @flow
import * as React from "react"
import { storiesOf } from "@storybook/react"

import Album from "./album"
import AlbumModel from "../models/album"

const albumData = {
  id: "5d8a27144b2a9c0008f22c08",
  timestamp: 1569560400000,
  title: "Hey, I’m Just Like You",
  artist: "Tegan and Sara",
  rating: "7.1",
  bnm: false,
  bnr: false,
  label: "Sire",
  url:
    "https://pitchfork.com/reviews/albums/tegan-and-sara-hey-im-just-like-you/",
  description:
    "On their ninth album, the twins revisit their roots, re-recording demos they wrote as teenagers and polishing them into poignant synth-pop gems.",
  genre: "Rock",
  spotify_album_id: "4tnkPLLedgamtrRCDdpqwX",
  spotify_artist_id: "5e1BZulIiYWPRm8yogwUYH",
  image_url: "https://i.scdn.co/image/cbdc58a95b67cbe3bed59e9a23494fe328971ef2"
}

const album = new AlbumModel(albumData)

storiesOf("Album", module).add("simple", () => {
  return <Album album={album} />
})
