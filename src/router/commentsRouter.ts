import express from 'express'
import { CommentsController } from '../controller/CommentsController'
import { CommentsBusiness } from '../business/CommentsBusiness'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { CommentsDatabase } from '../database/CommentsDatabase'

export const commentsRouter = express.Router()

const commentsController = new CommentsController(
    new CommentsBusiness(
        new CommentsDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

commentsRouter.post("/:id", commentsController.createComment)

//commentsRouter.get("/", commentsController.getComments)

//commentsRouter.put("/:id/like", commentsController.likeOrDislikeComment)