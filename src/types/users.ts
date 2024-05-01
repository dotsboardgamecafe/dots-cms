import { z } from 'zod';

export type UserData = {
  token: string;
  user_code: string;
  image_url: string;
  fullname: string;
  phone_number: string;
  email: string;
  expired_at: string;
  actor_type: string;
  created_date: string;
};

export type LoginPayload = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object( {
  email: z.string( { required_error: 'Email is required' } ),
  password: z.string( { required_error: 'Password is required' } ),
} );