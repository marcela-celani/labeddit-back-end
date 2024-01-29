import { ZodError } from "zod";
import { UserBusiness } from "../../../src/business/UserBusiness";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { NotFoundError } from "../../../src/errors/NotFoundError";
import { LoginSchema } from "../../../src/dtos/user/login.dto";

describe("Testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("deve gerar token ao logar", async () => {
    const input = LoginSchema.parse({
      email: "user@email.com",
      password: "user123",
    });

    const output = await userBusiness.login(input);

    expect(output).toEqual({
      token: "token-mock-user",
    });
  }); // AO COMPARAR SENHAS, ELE DIZ QUE ESTÁ INCORRETA


  test("deve disparar erro se o schema DTO não receber um email com uma string valida", async () => {
    try {
      const input = LoginSchema.parse({
        email: "emailinexistente",
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
      const input = LoginSchema.parse({
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

  test("deve disparar erro caso email não possua cadastro", async () => {
    expect.assertions(2)
    
    try {
      const input = LoginSchema.parse({
        email: "nome-sem-cadastro@email.com",
        password: "senhainexistente",
      });

      const output = await userBusiness.login(input)

    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe("Email não possui cadastro");
      }
    }
  });

  test("deve disparar erro caso a senha esteja incorreta", async () => {
    expect.assertions(2)
    
    try {
      const input = LoginSchema.parse({
        email: "user@email.com",
        password: "senhaincorreta",
      });

      const output = await userBusiness.login(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe("Senha incorreta");
      }
    }
  });
});
