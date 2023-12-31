import { Request, Response } from "express"
import { CommentsBusiness } from "../business/CommentsBusiness"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"
import { CreateCommentsSchema } from "../dtos/comments/createComments.dto"


export class CommentsController {
  constructor(
    private commentsBusiness: CommentsBusiness
  ) { }

  //endpoints requisiçao
  public createComment = async (req: Request, res: Response) => {
    try {
      const input = CreateCommentsSchema.parse({
        content: req.body.content,
        postId: req.params.id,
        token: req.headers.authorization
      })

      const output = await this.commentsBusiness.createComment(input)
      res.status(201).send(output)

    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado!")
      }
    }
  }


}