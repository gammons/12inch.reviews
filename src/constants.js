// @flow

// URLs
export const PROD_FUNCTIONS_URL = "https://12inch.reviews"
export const LOCAL_FUNCTIONS_URL = "http://localhost:9000"
export const FUNCTIONS_URL =
  process.env.NODE_ENV === "development"
    ? LOCAL_FUNCTIONS_URL
    : PROD_FUNCTIONS_URL

export const SPOTIFY_CLIENT_ID = "246fbd105e774530b341d50a7eedc0fc"
