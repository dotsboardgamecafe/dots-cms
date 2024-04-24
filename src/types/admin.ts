import { z } from 'zod';

export const AddAdminSchema = z.object( {
  name: z.string( { required_error: 'Name is required' } ),
  email: z.string( { required_error: 'Email is required' } ),
  phone: z.string().optional(),
  image: z.string( { required_error: 'Image is required' } ),
  status: z.enum( [ 'active', 'inactive' ], { required_error: 'Status is required' } ).default( 'active' )
} );

export type AdminType = {
  admin_code: string;
  email: string;
  name: string;
  status: string;
  img_url?: string;
  phone_number?: string;
};