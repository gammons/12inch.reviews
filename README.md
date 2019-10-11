# 12inch.reviews

This is the source code to [12inch.reviews][reviews].

**Tech used:**
* create-react-app
* Netlify functions
* Spotify web SDK
* A simple ruby library to utilize [Pitchfork][pf]'s API

[reviews]: https://12inch.reviews
[pf]: https://pitchfork.com

## Serving the spotify login netlify function locally:

```
export SPOTIFY_CLIENT_ID=asdf1234
export SPOTIFY_CLIENT_SECRET=asdf1234
export NODE_ENV=development
npx netlify-lambda serve .netlify/functions/
```



