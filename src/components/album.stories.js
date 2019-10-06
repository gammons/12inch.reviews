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

const rawAlbums = [
  {
    id: "5d88f8ab0480b10008ffa254",
    timestamp: 1569474000000,
    title: "Princess Catgirl",
    artist: "Cashmere Cat",
    rating: "6.8",
    bnm: false,
    bnr: false,
    label: "Mad Love",
    url: "https://pitchfork.com/reviews/albums/cashmere-cat-princess-catgirl/",
    description:
      "The Norwegian producer invents a Vocaloid-inspired feline character and retreats from the spotli t pop of his last album, returning to the introspective hush of his earlier work.",
    genre: "Electronic",
    spotify_album_id: "5DFEo8Nh5N6BYScoCDKvkh",
    spotify_artist_id: "2LZDXcxJWgsJfKXZv9a5eG",
    image_url:
      "https://i.scdn.co/image/d29cd251d5bdecb003033207dbe9b35640e04a12"
  },
  {
    id: "5d88fc7f5d366d000838ce6a",
    timestamp: 1569474000000,
    title: "Miami Memory",
    artist: "Alex Cameron",
    rating: "6.0",
    bnm: false,
    bnr: false,
    label: "Secretly Canadian",
    url: "https://pitchfork.com/reviews/albums/alex-cameron-miami-memory/",
    description:
      "On his third album, the smooth Australian rocker leaves behind the arch character studies and tr ies to craft something more personal and sincere.",
    genre: "Rock",
    spotify_album_id: "33u2PRETjYklC6UqxJBGW2",
    spotify_artist_id: "6kGMx9MqwnbKR2EYvZvvrG",
    image_url:
      "https://i.scdn.co/image/682c79ae5cc41dd1e14ef2c418fa9304c77e17ba"
  },
  {
    id: "5d38707f0ad9a700092558fa",
    timestamp: 1569474000000,
    title: "Hot Motion",
    artist: "Temples",
    rating: "5.0",
    bnm: false,
    bnr: false,
    label: "ATO",
    url: "https://pitchfork.com/reviews/albums/temples-hot-motion/",
    description:
      "The British psych-rockers’ third album boasts studied musicianship and strong arrangements—and v ery little else.",
    genre: "Rock",
    spotify_album_id: "5tDadlHuGJOt224mS61m8E",
    spotify_artist_id: "4ogwGU9VPWrnVBs1GEwZVV",
    image_url:
      "https://i.scdn.co/image/ab67616d0000b273b661fce74d31082316a82c1d"
  },
  {
    id: "5d88d1d80480b10008ffa1dd",
    timestamp: 1569387600000,
    title: "Memory",
    artist: "Vivian Girls",
    rating: "7.3",
    bnm: false,
    bnr: false,
    label: "Polyvinyl",
    url: "https://pitchfork.com/reviews/albums/vivian-girls-memory/",
    description:
      "On their first new album since 2011, Vivian Girls jump back into fried guitar, loose percussion, and fast and easy repetition, as if they’d simply woken up from an eight-year nap.",
    genre: "Rock",
    spotify_album_id: "4HeavElq33GHFm6QRCCotO",
    spotify_artist_id: "0WkO9Px6qQCM7so8lYvaCv",
    image_url:
      "https://i.scdn.co/image/d633a1ae336bc8c7975b2f84cb2df7c21d50e137"
  }
]

const albums = rawAlbums.map(albumData => new AlbumModel(albumData))

const onPlay = albumID => {
  console.log("will play", albumID)
}

storiesOf("Album", module).add("simple", () => {
  return (
    <div className="bg-gray-100 p-4 flex flex-row flex-wrap">
      {albums.map(album => (
        <div className="p-4">
          <Album onPlay={onPlay} album={album} />
        </div>
      ))}
    </div>
  )
})
