'use server'

import { revalidateTag } from 'next/cache';

import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { ClaimInvoicePayload, InvoiceType, MemberType } from '@/types/member';

export const getMembers = async (options?: ApiOptions) => {
  return await fetcher<MemberType[]>('getMembers', { ...options, requestOpt: { next: { tags: ['get-members'] } } });
};

export const getMemberDetail = async (memberId: string) => {
  return await fetcher<MemberType>('getMembers', { param: memberId, requestOpt: { next: { tags: [`get-member-${memberId}`] } } })
}

export const updateStatusMembers = async (options: ApiOptions) => {
  const res = await fetcher('changeStatusMember', options);
  revalidateTag('get-members')
  revalidateTag(`get-member-${options.param}`)
  return res
};

export const getMemberInvoices = async (options?: ApiOptions) => {
  const res = await fetcher<InvoiceType[]>('getUserInvoices', { ...options, requestOpt: { next: { tags: [`get-invoice-${options?.param}`] } } })
  return res
}

export const claimMemberInvoice = async (member_code: MemberType['user_code'], invoice_id: InvoiceType['invoice_code']) => {
  const claimInvoicePayload: ClaimInvoicePayload = {
    invoice_code: invoice_id
  }

  const res = await fetcher('claimInvoice', { param: member_code, body: claimInvoicePayload })
  revalidateTag(`get-invoices-${member_code}`)
  return res
}