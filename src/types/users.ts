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
  role_id: number,
  role_code: string,
  permissions:
  {
    permission_id: number;
    permission_code: string;
    name: string;
    route_pattern: string;
    route_method: string;
    description: string;
    status: string;
  }[];

};

export type LoginPayload = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object( {
  email: z.string( { required_error: 'Email is required' } ).min( 1, 'Email is required' ).email( 'Invalid email' ),
  password: z.string( { required_error: 'Password is required' } ).min( 1, 'Password is required' ),
} );