import fetch from "node-fetch"
import formData from "form-data"

exports.handler = async (event, context, callback) => {
  console.log("NODE_ENV = ", process.env.NODE_ENV)
  console.log("NODE_ENV = ", process.env.CONTEXT)

  const url =
    process.env.NODE_ENV === "production"
      ? "https://12inch.reviews"
      : "http://localhost:9000"
  const redirectUrl = url + "/.netlify/functions/spotifyLogin"

  console.log("redirectUrl = ", redirectUrl)

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

  console.log("data = ", data)

  callback(null, {
    statusCode: 301,
    body: "",
    headers: {
      Location: `http://localhost:3000?accessToken=${data.access_token}`
    }
  })
}
