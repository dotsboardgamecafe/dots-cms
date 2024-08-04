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
  total_spent: number;
};

export const AddMemberSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  email: z.string({ required_error: 'Email is required' }).min(1, 'Email is required'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
});

export type InvoiceItemType = {
  qty: number,
  price: number,
  product_id: number,
  sku: string,
  name: string,
  category_name: string
}

export type InvoiceType = {
  invoice_code: string,
  invoice_amount: number,
  invoice_items: InvoiceItemType[],
  claimed_time: string,
  claimed_date: string
}

export type ClaimInvoicePayload = {
  invoice_code: string
}
