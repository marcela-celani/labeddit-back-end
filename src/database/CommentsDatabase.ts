
import { COMMENT_LIKES, CommentDB, CommentDBWithCreatorName, LikeDislikeCommentDB } from "../models/Comment";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class CommentsDatabase extends BaseDatabase {
  public static TABLE_COMMENTS = "comments"
  public static TABLE_LIKES_DISLIKES_COMMENTS = "likes_dislikes_comments"
  // metodos database


  public insertComment = async (commentDB: CommentDB): Promise<void> => {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .insert(commentDB)
  }
  
  public async findCommentsByPostId(id: string): Promise<any> {
    const commentsDB: any = await BaseDatabase.connection(
      CommentsDatabase.TABLE_COMMENTS
    )
      .select()
      .where(`${CommentsDatabase.TABLE_COMMENTS}.post_id`, "=", `${id}`);

    return commentsDB;
  }

  public async findCommentById(id: string): Promise<CommentDB | undefined> {
    const [result] = await BaseDatabase.connection(
      CommentsDatabase.TABLE_COMMENTS
    )
      .select()
      .where({ id });

    return result as CommentDB | undefined;
  }

  public updateComment = async (commentDB: CommentDB) => {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .update(commentDB)
      .where({ id: commentDB.id })
  }

  public deleteCommentById = async (id: string): Promise<void> => {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .delete()
      .where({ id })
  }

  public findCommentWithCreatorNameById = async (id: string): Promise<CommentDBWithCreatorName | undefined> => {
    const [commentsDB] = await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .select(
        `${CommentsDatabase.TABLE_COMMENTS}.id`,
        `${CommentsDatabase.TABLE_COMMENTS}.post_id`,
        `${CommentsDatabase.TABLE_COMMENTS}.creator_id`,
        `${CommentsDatabase.TABLE_COMMENTS}.content`,
        `${CommentsDatabase.TABLE_COMMENTS}.likes`,
        `${CommentsDatabase.TABLE_COMMENTS}.dislikes`,
        `${CommentsDatabase.TABLE_COMMENTS}.created_at`,
        `${CommentsDatabase.TABLE_COMMENTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`
      ).join(
        `${UserDatabase.TABLE_USERS}`,
        `${CommentsDatabase.TABLE_COMMENTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`)
      .where({ [`${CommentsDatabase.TABLE_COMMENTS}.id`]: id })

    return commentsDB as CommentDBWithCreatorName | undefined
  }

  public findLikeDislike = async (likeDislikeDB: LikeDislikeCommentDB): Promise<COMMENT_LIKES | undefined> => {
    const [result] = await BaseDatabase
      .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
      .select()
      .where({
        user_id: likeDislikeDB.user_id,
        comment_id: likeDislikeDB.comment_id
      })

    if(result === undefined){
      return undefined
    } else if(result.like === 1) {
      return COMMENT_LIKES.LIKED
    } else {
      return COMMENT_LIKES.DISLIKED
    }
  }

  public removeLikeDislike = async (likeDislikeDB: LikeDislikeCommentDB): Promise<void> => {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        comment_id: likeDislikeDB.comment_id
      })

  }

  public updateLikeDislike = async (likeDislikeDB: LikeDislikeCommentDB) => {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        comment_id: likeDislikeDB.comment_id
      })
  }

  public insertLikeDislike = async (likeDislikeDB: LikeDislikeCommentDB) => {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
      .insert(likeDislikeDB)
  }

}