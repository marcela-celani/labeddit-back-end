
import { CommentDB } from "../models/Comment";
import { BaseDatabase } from "./BaseDatabase";

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

}