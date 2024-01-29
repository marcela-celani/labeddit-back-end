import { PostsBusiness } from "../../../src/business/PostsBusiness";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { PostsDatabaseMock } from "../../mocks/PostsDatabaseMock";
import { EditPostsSchema } from "../../../src/dtos/posts/editPosts.dto";
import { ForbiddenError } from "../../../src/errors/ForbiddenError";
import { NotFoundError } from "../../../src/errors/NotFoundError";
import { DeletePostsSchema } from "../../../src/dtos/posts/deletePosts.dto";

describe("Testando delete post", () => {
  const postsBusiness = new PostsBusiness(
    new PostsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Success test: deve poder deletar post", async () => {
    const input = DeletePostsSchema.parse({
      token: "token-mock-user",
      idToEdit: "eadcdc2b-59bc-4794-8c57-21690a6cf040",
    });

    await postsBusiness.deletePost(input);
  });

  test("Error test: deve não poder deletar post, pois o id do post não existe", async () => {
    try {
      const input = DeletePostsSchema.parse({
        token: "token-mock-user",
        idToEdit: "id não existe",
      });

      await postsBusiness.deletePost(input);
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toBe("Post com esta id não existe");
        expect(error.statusCode).toBe(404);
      }
    }
  });

  test("Error test: deve não poder editar post, caso não seja o criador do post", async () => {
    try {
      const input = EditPostsSchema.parse({
        content: "teste de edição de post",
        token: "token-mock-invalido",
        idToEdit: "eadcdc2b-59bc-4794-8c57-21690a6cf040",
      });

      await postsBusiness.editPost(input);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        expect(error.message).toBe("Somente o criador do post pode editá-lo");
        expect(error.statusCode).toBe(403);
      }
    }
  });
});
