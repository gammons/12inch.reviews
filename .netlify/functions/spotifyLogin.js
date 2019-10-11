import fetch from "node-fetch"
import formData from "form-data"

exports.handler = async (event, context, callback) => {
  const redirectUrl = "http://localhost:9000/.netlify/functions/spotifyLogin"

  const args = []
  args.push("grant_type=authorization_code")
  args.push(`code=${event.queryStringParameters.code}`)
  args.push(`redirect_uri=${encodeURIComponent(redirectUrl)}`)

  const clientID = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const auth = Buffer.from(`${clientID}:${clientSecret}`).toString("base64")

  const url = `https://accounts.spotify.com/api/token?${args.join("&")}`

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })

  const data = await resp.json()

  callback(null, {
    statusCode: 301,
    headers: {
      Location: `http://localhost:3000?accessToken=${data.access_token}`
    }
  })
}
