import { USER_ROLES, UserDB } from "../../src/models/User";
import { BaseDatabase } from "../../src/database/BaseDatabase";

const usersMock: UserDB[] = [
  {
    id: "id-mock-user",
    name: "user",
    email: "user@email.com",
    password: "hash-mock-user", // senha = "user123"
    created_at: new Date().toISOString(),
    role: USER_ROLES.NORMAL
  },
  {
    id: "id-mock-admin",
    name: "admin",
    email: "admin@email.com",
    password: "hash-mock-admin", // senha = "admin123"
    created_at: new Date().toISOString(),
    role: USER_ROLES.ADMIN
  },
]

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "users"

  public async findUserByEmail(
    email: string
  ): Promise<UserDB | undefined> {
    return usersMock.filter(user => user.email === email)[0]
  }

  public async insertUser(
    newUserDB: UserDB
  ): Promise<void> {

  }
}