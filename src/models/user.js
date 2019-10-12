// @flow

export default class User {
  accessToken: string
  refreshToken: string
  expiresIn: number

  constructor(args = {}) {
    this.accessToken = args.accessToken
    this.refreshToken = args.refreshToken
    this.expiresIn = args.expiresIn
  }
}
