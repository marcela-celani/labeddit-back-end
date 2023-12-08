import z from 'zod'

export interface LikeOrDislikeCommentInputDTO {
    token: string,
    like: boolean,
    commentId: string
}

export type LikeOrDislikeCommentOutputDTO = undefined

export const LikeOrDislikeCommentSchema = z.object({
    token: z.string(),
    like: z.boolean(),
    commentId: z.string().min(1)
}).transform(data => data as LikeOrDislikeCommentInputDTO)