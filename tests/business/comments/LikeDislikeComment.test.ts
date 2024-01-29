import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { PostsDatabaseMock } from "../../mocks/PostsDatabaseMock";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock";
import { CommentsBusiness } from "../../../src/business/CommentsBusiness";
import { GetCommentsSchema } from "../../../src/dtos/comments/getComments.dto";
import { LikeOrDislikeCommentSchema } from "../../../src/dtos/comments/likeOrDislikeComment.dto";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";
import { NotFoundError } from "../../../src/errors/NotFoundError";

describe("Testando get comments", () => {
  const commentsBusiness = new CommentsBusiness(
    new CommentsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new PostsDatabaseMock()
  );

  test("Success test: deve poder curtir comentário em post", async () => {
    const input = LikeOrDislikeCommentSchema.parse({
      token: "token-mock-user",
      like: true,
      commentId: "23ghfd02-643f-4440-a79c-4ef92d730dfb"
    });

    await commentsBusiness.likeOrDislikeComment(input);
  });

  test("Error test: deve não poder ver comentarios devido a token inválido", async () => {
    try {
        const input = LikeOrDislikeCommentSchema.parse({
            token: "token-mock-invalido",
            like: true,
            commentId: "23ghfd02-643f-4440-a79c-4ef92d730dfb"
          });
      
          await commentsBusiness.likeOrDislikeComment(input);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        expect(error.message).toBe("Token inválido!");
        expect(error.statusCode).toBe(401);
      }
    }
  });

  test("Error test: deve não poder curtir comentário com id inexistente", async () => {
    try {
        const input = LikeOrDislikeCommentSchema.parse({
            token: "token-mock-user",
            like: true,
            commentId: "id inexistente"
          });
      
          await commentsBusiness.likeOrDislikeComment(input);
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toBe("Comment com esta 'id' não existe");
        expect(error.statusCode).toBe(404);
      }
    }
  });
});
