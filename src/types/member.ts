import { z } from 'zod';

export type MemberType = {
  user_code: string;
  email: string;
  username: string;
  phone_number: string;
  fullname: string;
  image_url: string;
  latest_point: number;
  latest_tier: string;
  password: string;
  x_player: string;
  status_verification: boolean;
  status: string;
  created_date: string;
  updated_date: string;
  deleted_date: string;
};

export const AddMemberSchema = z.object( {
  name: z.string( { required_error: 'Name is required' } ),
  email: z.string( { required_error: 'Email is required' } ),
  password: z.string( { required_error: 'Password is required' } ),
} );