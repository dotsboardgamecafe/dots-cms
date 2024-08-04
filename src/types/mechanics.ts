import { z } from "zod";

export type MechanicType = {
  code: string,
  name: string,
  created_date: string,
}

export const AddEditGameMechanicSchema = z.object({
  name: z.string({ required_error: 'Game mechanic name is required' }).min(1, 'Game mechanic name is required'),
});

export type GameMechanicPayload = z.infer<typeof AddEditGameMechanicSchema>