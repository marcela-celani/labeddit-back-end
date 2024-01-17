import { ZodError } from "zod";
import { UserBusiness } from "../../src/business/UserBusiness";
import { SignUpSchema } from "../../src/dtos/user/signUp.dto";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { BadRequestError } from "../../src/errors/BadRequestError";

describe("Testando signup", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("deve gerar token ao cadastrar", async () => {
    const input = SignUpSchema.parse({
      name: "user1",
      email: "user1@email.com",
      password: "user123",
    });

    const output = await userBusiness.signup(input);

    expect(output).toEqual({
      token: "token-mock",
    });
  });

  test("deve disparar erro se o schema DTO não receber um nome com uma string valida", async () => {
    try {
      const input = SignUpSchema.parse({
        name: "",
        email: "user@email.com",
        password: "user123",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe(
          "String must contain at least 2 character(s)"
        );
      }
    }
  });

  test("deve disparar erro se o schema DTO não receber um email com uma string valida", async () => {
    try {
      const input = SignUpSchema.parse({
        name: "user",
        email: "user",
        password: "user123",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe("Invalid email");
      }
    }
  });

  test("deve disparar erro se o schema DTO não receber um password com uma string valida", async () => {
    try {
      const input = SignUpSchema.parse({
        name: "user",
        email: "user@email.com",
        password: "",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe(
          "String must contain at least 6 character(s)"
        );
      }
    }
  });

  test("deve disparar erro caso email já exista", async () => {
    expect.assertions(2)
    
    try {
      const input = SignUpSchema.parse({
        name: "user",
        email: "user@email.com",
        password: "user123",
      });

      const output = await userBusiness.signup(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe("email já existe");
      }
    }
  });
});
