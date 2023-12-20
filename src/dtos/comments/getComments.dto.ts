import z from 'zod'
import { CommentModel } from '../../models/Comment'

export interface GetCommentsInputDTO {
    token: string
}

export type GetCommentsOutputDTO = CommentModel[]

export const GetCommentsSchema = z.object({
    token: z.string()
}).transform(data => data as GetCommentsInputDTO)