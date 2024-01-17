import { TokenPayload, USER_ROLES } from '../../src/models/User'

export class TokenManagerMock {
  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
      // signup de nova conta
      return "token-mock"

    } else if (payload.id === "id-mock-user") {
      // login de user (conta normal)
      return "token-mock-user"

    } else {
      // login de admin (conta admin)
      return "token-mock-admin"
    }
  }

  public getPayload = (token: string): TokenPayload | null => {
    if (token === "token-mock-user") {
      return {
        id: "id-mock-user",
        name: "user",
        role: USER_ROLES.NORMAL
      }

    } else if (token === "token-mock-admin") {
      return {
        id: "id-mock-admin",
        name: "admin",
        role: USER_ROLES.ADMIN
      }

    } else {
      return null
    }
  }
}