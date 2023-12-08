import z from 'zod'


export interface CreateCommentsInputDTO {
    content: string
    postId: string
    token: string
}

export type CreateCommentsOutputDTO = undefined

export const CreateCommentsSchema = z.object({
    content: z.string().min(1).max(280),
    postId: z.string().min(1),
    token: z.string()
}).transform(data => data as CreateCommentsInputDTO)
