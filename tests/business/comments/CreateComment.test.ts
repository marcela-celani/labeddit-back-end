import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { PostsDatabaseMock } from "../../mocks/PostsDatabaseMock";
import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock";
import { CommentsBusiness } from "../../../src/business/CommentsBusiness";
import { CreateCommentsSchema } from "../../../src/dtos/comments/createComments.dto";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";

describe("Testando get comments", () => {
  const commentsBusiness = new CommentsBusiness(
    new CommentsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new PostsDatabaseMock()
  );

  test("Success test: deve poder criar um comentário em um post existente", async () => {
    const input = CreateCommentsSchema.parse({
      content: "teste de criação de comentário em post",
      postId: "eadcdc2b-59bc-4794-8c57-21690a6cf040",
      token: "token-mock-user",
    });

    await commentsBusiness.createComment(input);
  });

  test("Error test: deve não poder criar comentario devido a token inválido", async () => {
    try {
      const input = CreateCommentsSchema.parse({
        content: "teste de criação de comentário em post",
        postId: "eadcdc2b-59bc-4794-8c57-21690a6cf040",
        token: "token-mock-invalido",
      });
      await commentsBusiness.createComment(input);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        expect(error.message).toBe("Token inválido!");
        expect(error.statusCode).toBe(401);
      }
    }
  });
});
