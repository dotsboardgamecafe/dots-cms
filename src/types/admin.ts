import { z } from 'zod';

export const AddAdminSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
  email: z.string({ required_error: 'Email is required' }).min(1, 'Email is required'),
  phone_number: z.string().min(6, 'Invalid phone number').optional(),
  image_url: z.string({ required_error: 'Image is required' }).min(1, 'Image is required'),
  status: z.enum(['active', 'inactive'], { required_error: 'Status is required' }).default('active')
});

export const EditAdminSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required').optional(),
  email: z.string({ required_error: 'Email is required' }).min(1, 'Email is required'),
  phone_number: z.string().min(6, 'Invalid phone number').optional(),
  image_url: z.string({ required_error: 'Image is required' }).min(1, 'Image is required'),
  status: z.enum(['active', 'inactive'], { required_error: 'Status is required' }).default('active')
});

export type AdminType = {
  admin_code: string;
  email: string;
  name: string;
  status: string;
  img_url?: string;
  phone_number?: string;
  password?: string;
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