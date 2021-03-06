import fetch from "node-fetch"
import formData from "form-data"

exports.handler = async (event, context, callback) => {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://12inch.reviews"
  const redirectUrl = url + "/.netlify/functions/spotifyLogin"

  const args = []
  args.push("grant_type=authorization_code")
  args.push(`code=${event.queryStringParameters.code}`)
  args.push(`redirect_uri=${encodeURIComponent(redirectUrl)}`)

  const clientID = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const auth = Buffer.from(`${clientID}:${clientSecret}`).toString("base64")

  const spotifyUrl = `https://accounts.spotify.com/api/token?${args.join("&")}`

  const resp = await fetch(spotifyUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })

  const data = await resp.json()
  const date = new Date()
  const expires = date.setHours(date.getHours() + 1)
  const redirectArgs = `accessToken=${data.access_token}&refreshToken=${data.refresh_token}&expires=${expires}`

  callback(null, {
    statusCode: 301,
    body: "",
    headers: {
      Location: `${url}?${redirectArgs}`
    }
  })
}
