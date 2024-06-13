import { z } from "zod";


export type TBannerData = {
  banner_code: string,
  banner_type: string,
  title: string,
  description: string,
  image_url: string,
  status: string,
  created_date: string,
  updated_date: string,
  deleted_date: string
}

export const AddBannerSchema = z.object({
  name: z.string({ required_error: "You need to input the banner name.", }).min(1, "You need to input the banner name."),
  title: z.string({ required_error: "You need to input the banner title.", }).min(1, "You need to input the banner title."),
  description: z.string({ required_error: "You need to input the banner description.", }).min(1, "You need to input the banner description."),
  image_url: z.string({ required_error: "You need to upload the image for the banner.", }).min(1, "You need to upload the image for the banner."),
  status: z.string({ required_error: "You need to select the banner status.", }).min(1, "You need to select the banner status."),
  banner_type: z.string({ required_error: "You need to select the banner category.", }).min(1, "You need to select the banner category."),
});

export type TPostBannerPayload = z.infer<typeof AddBannerSchema> & { name: string }