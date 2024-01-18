import { CommentsDatabase } from "../database/CommentsDatabase";
import { PostsDatabase } from "../database/PostsDatabase";
import {
  CreateCommentsInputDTO,
  CreateCommentsOutputDTO,
} from "../dtos/comments/createComments.dto";
import {
  GetCommentsInputDTO,
  GetCommentsOutputDTO,
} from "../dtos/comments/getComments.dto";
import { LikeOrDislikeCommentInputDTO, LikeOrDislikeCommentOutputDTO } from "../dtos/comments/likeOrDislikeComment.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { COMMENT_LIKES, Comment, LikeDislikeCommentDB } from "../models/Comment";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentsBusiness {
  constructor(
    private commentsDatabase: CommentsDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private postDatabase: PostsDatabase
  ) {}

  // regras de negocio
  public createComment = async (
    input: CreateCommentsInputDTO
  ): Promise<CreateCommentsOutputDTO> => {
    const { content, token, postId } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError("Token inválido!");
    }

    const id = this.idGenerator.generate();

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
    );

    const commentDB = comment.toDBModel();
    await this.commentsDatabase.insertComment(commentDB);

    await this.postDatabase.updateCommentNumber(postId)
  };

  public getComments = async (
    input: GetCommentsInputDTO
  ): Promise<GetCommentsOutputDTO> => {
    const { token, postId } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError("Token inválido");
    }

    const commentsDB = await this.commentsDatabase.findCommentsByPostId(postId);

    const commentsModel = commentsDB.map((commentDB: any) => {
      const comment = new Comment(
        commentDB.id,
        commentDB.post_id,
        commentDB.content,
        commentDB.likes,
        commentDB.dislikes,
        commentDB.created_at,
        commentDB.updated_at,
        commentDB.created_at,
        commentDB.creator_name
      );

      return comment.toBusinessModel()
    });

    const response: GetCommentsOutputDTO = commentsModel;

    return response;
  };

  public likeOrDislikeComment = async (
    input: LikeOrDislikeCommentInputDTO
  ): Promise<LikeOrDislikeCommentOutputDTO> => {
    const { token, commentId, like } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError("Token inválido!");
    }

    const commentDbWithCreatorName =
      await this.commentsDatabase.findCommentWithCreatorNameById(commentId);

    if (!commentDbWithCreatorName) {
      throw new NotFoundError("Comment com esta 'id' não existe");
    }

    const comment = new Comment(
        commentDbWithCreatorName.id,
        commentDbWithCreatorName.post_id,
        commentDbWithCreatorName.content,
        commentDbWithCreatorName.likes,
        commentDbWithCreatorName.dislikes,
        commentDbWithCreatorName.created_at,
        commentDbWithCreatorName.updated_at,
        commentDbWithCreatorName.creator_id,
        commentDbWithCreatorName.creator_name,
    );

    const likeSqlite = like ? 1 : 0;

    const likeDislikeDB: LikeDislikeCommentDB = {
      user_id: payload.id,
      comment_id: commentId,
      like: likeSqlite,
    };   

    const likeDislikeExists = await this.commentsDatabase.findLikeDislike(
      likeDislikeDB
    );

    if (likeDislikeExists === COMMENT_LIKES.LIKED) {
      if (like === true) {
        await this.commentsDatabase.removeLikeDislike(likeDislikeDB);
        comment.removeLike();
      } else {
        await this.commentsDatabase.updateLikeDislike(likeDislikeDB);
        comment.removeLike();
        comment.addDislike();
      }
    } else if (likeDislikeExists === COMMENT_LIKES.DISLIKED) {
      if (like === false) {
        await this.commentsDatabase.removeLikeDislike(likeDislikeDB);
        comment.removeDislike();
      } else {
        await this.commentsDatabase.updateLikeDislike(likeDislikeDB);
        comment.removeDislike();
        comment.addLike();
      }
    } else {
      await this.commentsDatabase.insertLikeDislike(likeDislikeDB);
      like ? comment.addLike() : comment.addDislike();
    }

    const updatedPostDB = comment.toDBModel();
    await this.commentsDatabase.updateComment(updatedPostDB);

    const output: LikeOrDislikeCommentOutputDTO = undefined;
    return output;
  };
}
