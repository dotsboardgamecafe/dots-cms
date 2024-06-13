import { z } from 'zod';

export type RewardType = {
  Tier: {
    tier_code: string;
    name: string;
    description: string;
    status: string;
    created_date: string;
    updated_date: string;
    deleted_date: string;
    min_point: number;
    max_point: number;
  },
  name: string;
  image_url: string;
  category_type: string;
  reward_code: string;
  voucher_code: string;
  status: string;
  description: string;
  expired_date: string;
  created_date: string;
  updated_date: string;
};

export const RewardAddSchema = z.object({
  tier_code: z.string({ required_error: 'Tier is required' }).min(1, 'Tier is required'),
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  image_url: z.string({ required_error: 'Image is required' }).url('Image is required'),
  category_type: z.string({ required_error: 'Category is required' }).min(1, 'Category is required'),
  status: z.string({ required_error: 'Status is required' }).min(1, 'Status is required'),
  expired_date: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: 'Invalid date format, expected yyyy-mm-dd',
  }),
});