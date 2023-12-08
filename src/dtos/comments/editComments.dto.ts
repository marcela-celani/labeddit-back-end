import z from 'zod'
import { PostModel } from '../../models/Post'

export interface EditCommentsInputDTO {
    content: string,
    token: string,
    idToEdit: string
}

export type EditCommentsOutputDTO = undefined

export const EditCommentsSchema = z.object({
    content: z.string().min(1).max(280),
    token: z.string(),
    idToEdit: z.string().min(1)
}).transform(data => data as EditCommentsInputDTO)