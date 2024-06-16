import { z } from 'zod';

import { isValidEmailFormat } from '@/helper/string';

export const AddAdminSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  username: z.string({ required_error: 'Username is required' }).min(1, 'Username is required'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
  email: z.string({ required_error: 'Email is required' }).min(1, 'Email is required').refine((value) => isValidEmailFormat(value), 'Email format is not valid'),
  phone_number: z.string().optional().refine((value) => !value || (value.length > 6), 'Invalid phone number'),
  image_url: z.string({ required_error: 'Image is required' }).min(1, 'Image is required'),
  status: z.enum(['active', 'inactive'], { required_error: 'Status is required' }).default('active')
});

export const EditAdminSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  username: z.string({ required_error: 'Username is required' }).min(1, 'Username is required'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required').optional(),
  email: z.string({ required_error: 'Email is required' }).min(1, 'Email is required').refine((value) => isValidEmailFormat(value), 'Email format is not valid'),
  phone_number: z.string().optional().refine((value) => !value || value.length > 6, 'Invalid phone number'),
  image_url: z.string({ required_error: 'Image is required' }).min(1, 'Image is required'),
  status: z.enum(['active', 'inactive'], { required_error: 'Status is required' }).default('active')
});

export type AdminType = {
  admin_code: string;
  email: string;
  name: string;
  status: string;
  image_url?: string;
  phone_number?: string;
  password?: string;
  user_name: string;
};

export type AddAdminPayload = {
  name: string,
  email: string,
  phone_number?: string,
  image_url: string,
  status: string
}

export type EditAdminPayload = {
  name: string,
  email: string,
  phone_number?: string,
  image_url: string,
  status: string
}