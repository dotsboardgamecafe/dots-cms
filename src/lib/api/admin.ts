'use server'

import { revalidateTag } from 'next/cache';

import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { AddAdminPayload, AdminType } from '@/types/admin';

export const getAdmins = async (options?: ApiOptions) => {
  const res = await fetcher<AdminType[]>('getAdmins', { ...options, requestOpt: { next: { tags: ['get-admins'] } } });
  return res
};

export const createAdmin = async (payload: AddAdminPayload) => {
  const res = await fetcher('createAdmin', { body: payload });
  revalidateTag('get-admins')
  return res
}

export const updateAdmin = async (admin_code: string, payload: AddAdminPayload) => {
  const res = await fetcher('updateAdmin', { param: admin_code, body: payload });
  revalidateTag('get-admins')
  return res
}