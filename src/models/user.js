// @flow

export default class User {
  accessToken: string

  constructor(args = {}) {
    this.accessToken = args.accessToken
  }
}
