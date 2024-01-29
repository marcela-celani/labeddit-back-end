import { ZodError } from "zod";
import { PostsBusiness } from "../../../src/business/PostsBusiness";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { PostsDatabaseMock } from "../../mocks/PostsDatabaseMock";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { NotFoundError } from "../../../src/errors/NotFoundError";
import { LoginSchema } from "../../../src/dtos/user/login.dto";
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock";
import { UserBusiness } from "../../../src/business/UserBusiness";
import { CreatePostsSchema } from "../../../src/dtos/posts/createPosts.dto";

describe("Testando create post", () => {
  const postsBusiness = new PostsBusiness(
    new PostsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Success test: deve gerar token ao logar", async () => {
    const input = CreatePostsSchema.parse({
      content: "teste de criação de post",
      token: "token-mock-user",
    });

    const output = await postsBusiness.createPost(input);

    expect(output.statusCode).toBe(200);
  });

  test("Error test: deve não poder logar devido a token inválido", async () => {
    try {
      const input = CreatePostsSchema.parse({
        content: "teste de criação de post",
        token: "token-mock-inválido",
      });

      await postsBusiness.createPost(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("Token inválido!");
        expect(error.statusCode).toBe(400);
      }
    }
  });

  
});
