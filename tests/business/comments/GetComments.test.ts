import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { PostsDatabaseMock } from "../../mocks/PostsDatabaseMock";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock";
import { CommentsBusiness } from "../../../src/business/CommentsBusiness";
import { GetCommentsSchema } from "../../../src/dtos/comments/getComments.dto";

describe("Testando get comments", () => {
  const commentsBusiness = new CommentsBusiness(
    new CommentsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new PostsDatabaseMock()
  );

  test("Success test: deve retornar comentários de um post com id fornecido", async () => {
    const input = GetCommentsSchema.parse({
      postId: "eadcdc2b-59bc-4794-8c57-21690a6cf040",
      token: "token-mock-user",
    });

    await commentsBusiness.getComments(input);
  });

  test("Error test: deve não poder ver comentarios devido a token inválido", async () => {
    try {
      const input = GetCommentsSchema.parse({
        postId: "eadcdc2b-59bc-4794-8c57-21690a6cf040",
        token: "token-mock-invalido",
      });

      await commentsBusiness.getComments(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("Token inválido");
        expect(error.statusCode).toBe(400);
      }
    }
  });
});
