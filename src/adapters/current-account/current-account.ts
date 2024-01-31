import { Cache, Cryptography } from '../'
export type CommonUsuarioClaims = {
  nameid: number
  unique_name: string
  email: string
  nbf: number
  exp: number
  iat: number
  iss: string
  aud: string
}


export const getCurrentAccount = (): CommonUsuarioClaims | undefined  => {
  const accessToken = Cache.get({ key: 'accessToken' })

  if (accessToken) {
    const decodeToken = Cryptography.decodeToken<any>(accessToken)

    const dateNow = new Date()
    const expirationToken =
      (decodeToken as unknown as CommonUsuarioClaims).exp * 1000

    if (expirationToken < dateNow.getTime()) {
      Cache.remove({ key: 'accessToken' })
      return
    }

    return decodeToken as CommonUsuarioClaims
  }
}
