# 12inch.reviews

This is the source code to [12inch.reviews][reviews].  This is a simple mash-up between Pitchfork reviews and the Spotify web sdk.

**Tech used:**
* create-react-app
* Netlify functions
* Spotify web SDK
* A simple ruby library to utilize [Pitchfork][pf]'s API

[reviews]: https://12inch.reviews
[pf]: https://pitchfork.com

## running locally

1. In order for the player to work, You'll need a `.env` file that includes `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`.
2. `yarn && yarn start`
