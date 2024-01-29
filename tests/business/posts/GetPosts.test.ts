import { PostsBusiness } from "../../../src/business/PostsBusiness";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { PostsDatabaseMock } from "../../mocks/PostsDatabaseMock";
import { GetPostsSchema } from "../../../src/dtos/posts/getPosts.dto";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";

describe("Testando get posts", () => {
  const postsBusiness = new PostsBusiness(
    new PostsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Success test: deve retornar posts", async () => {
    const input = GetPostsSchema.parse({
      token: "token-mock-user",
    });

    await postsBusiness.getPosts(input);
  });

  test("Error test: não deve retornar posts devido a token inválido", async () => {
    try {
      const input = GetPostsSchema.parse({
        token: "token-mock-user",
      });

      await postsBusiness.getPosts(input);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        expect(error.message).toBe("Token inválido!");
        expect(error.statusCode).toBe(400);
      }
    }
  });
});
