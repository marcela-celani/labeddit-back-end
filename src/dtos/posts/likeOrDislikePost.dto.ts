import z from 'zod'

export interface LikeOrDislikePostInputDTO {
    token: string,
    like: boolean,
    postId: string
}

export type LikeOrDislikePostOutputDTO = undefined

export const LikeOrDislikePostSchema = z.object({
    token: z.string(),
    like: z.boolean(),
    postId: z.string().min(1)
}).transform(data => data as LikeOrDislikePostInputDTO)