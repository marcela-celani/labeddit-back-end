import express from 'express'
import { CommentsController } from '../controller/CommentsController'
import { CommentsBusiness } from '../business/CommentsBusiness'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { PostsDatabase } from '../database/PostsDatabase'

export const commentsRouter = express.Router()

const commentsController = new CommentsController(
    new CommentsBusiness(
        new PostsDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

commentsRouter.post("/", commentsController.createComment)

commentsRouter.get("/", commentsController.getComments)

commentsRouter.put("/:id", commentsController.editComment)

commentsRouter.delete("/:id", commentsController.deleteComment)

commentsRouter.put("/:id/like", commentsController.likeOrDislikeComment)