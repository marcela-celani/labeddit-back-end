import z from 'zod'

export interface DeleteCommentsInputDTO {
    token: string,
    idToEdit: string
}

export type DeleteCommentsOutputDTO = undefined

export const DeleteCommentsSchema = z.object({
    token: z.string(),
    idToEdit: z.string().min(1)
}).transform(data => data as DeleteCommentsInputDTO)