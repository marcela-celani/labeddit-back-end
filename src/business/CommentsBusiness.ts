import { CommentsDatabase } from "../database/CommentsDatabase";
import { CreateCommentsInputDTO, CreateCommentsOutputDTO } from "../dtos/comments/createComments.dto";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Comment } from "../models/Comment";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentsBusiness {
    constructor(
        private commentsDatabase: CommentsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    // regras de negocio
    public createComment = async (
        input: CreateCommentsInputDTO
    ): Promise<CreateCommentsOutputDTO> => {
        const { content, token, postId } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Token inválido!")
        }

        const id = this.idGenerator.generate()

        const comment = new Comment(
            id,
            postId,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        )

        const commentDB = comment.toDBModel()
        await this.commentsDatabase.insertComment(commentDB)
    }

}