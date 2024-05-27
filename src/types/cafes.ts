import { z } from "zod";

export type CafeType = {
  cafe_code: string;
  name: string;
  address: string;
  description: string;
  status: string;
  province: string;
  city: string;
};

export const AddCafeSchema = z.object({
  name: z.string({ required_error: "You need to input the cafe name.", }),
  address: z.string({ required_error: "You need to input the cafe address.", }),
  province: z.string({ required_error: "You need to input the cafe province.", }),
  city: z.string({ required_error: "You need to input the cafe city.", }),
  description: z.string({ required_error: "You need to input the cafe description.", }),
  status: z.string({ required_error: "You need to select the cafe status.", }),
});

export type CafePayload = z.infer<typeof AddCafeSchema>;

export const CafeFilterSchema = z.object({
  status: z.string(),
});

export type CafeFilter = {
  status: string
}