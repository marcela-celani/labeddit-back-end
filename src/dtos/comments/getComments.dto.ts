import z from 'zod'
import { PostModel } from '../../models/Post'

export interface GetCommentsInputDTO {
    token: string
}

export type GetCommentsOutputDTO = PostModel[]

export const GetCommentsSchema = z.object({
    token: z.string()
}).transform(data => data as GetCommentsInputDTO)