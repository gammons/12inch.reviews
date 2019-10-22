# 12inch.reviews

This is the source code to [12inch.reviews][reviews].  It's a simple mash-up between Pitchfork reviews and the Spotify web sdk.

The entire app is frontend-only, created via `create-react-app`.

There is a `retriever` directory that is in charge of gathering album data via Pitchfork's API.  The album data is then broken into multiple json files that are `fetch`ed after the main page is booted and up. 

The album JSON files are currently stored directly into the `public` dir, under source control.  This is mainly out of convenience since I have Netlify set to automatically deploy upon pushing to master.

All filtering occurs in the browser, using Javascript's native `filter` method for arrays.  I've found that this is still fast, even with tens of thousands of reviews loaded.

## The connection to Spotify

The `retriever` script matches up each album with a Spotify album URI, via Spotify's [search api][search].

Login occurs by token authorization that originates on the frontend.  The authorization code from spotify is then fed into a [netlify function](https://github.com/gammons/12inch.reviews/blob/master/.netlify/functions/spotifyLogin.js) that has the secret key, which exchanges the code for an access token.

The access token only has a shelf life of 1 hour, so refreshing occurs automatically when the token is expired and the player needs to play something.


## Tech used

* [create-react-app](https://github.com/facebook/create-react-app)
* [Netlify functions](https://www.netlify.com/products/functions/)
* [spotify web SDK](https://developer.spotify.com/documentation/web-playback-sdk/quick-start/)
* retriever - A simple ruby library get album data from Pitchfork

[reviews]: https://12inch.reviews
[search]: https://developer.spotify.com/documentation/web-api/reference/search/search/

## running locally

1. In order for the player to work, You'll need a `.env` file that includes `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`.
2. `yarn && yarn start`

## License

This project is licensed under the GNU General public license.  See (LICENSE.txt)[https://github.com/gammons/12inch.reviews/blob/master/LICENSE.txt] for more info.
