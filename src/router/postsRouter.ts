import express from 'express'
import { PostsController } from '../controller/PostsController'
import { PostsBusiness } from '../business/PostsBusiness'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { PostsDatabase } from '../database/PostsDatabase'
import { CommentsController } from '../controller/CommentsController'
import { CommentsBusiness } from '../business/CommentsBusiness'
import { CommentsDatabase } from '../database/CommentsDatabase'


export const postsRouter = express.Router()

const postsController = new PostsController(
    new PostsBusiness(
        new PostsDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

const commentsController = new CommentsController(
    new CommentsBusiness(
        new CommentsDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new PostsDatabase()
    )
)

postsRouter.post("/", postsController.createPost)

postsRouter.post("/:post_id/comments", commentsController.createComment)

postsRouter.get("/", postsController.getPosts)

postsRouter.get("/:post_id/comments", commentsController.getComments);

postsRouter.put("/:post_id/like", postsController.likeOrDislikePost)

postsRouter.put("/:post_id/comments/:comment_id/like", commentsController.likeOrDislikeComment)