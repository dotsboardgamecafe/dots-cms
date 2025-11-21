'use server'

import { revalidateTag } from 'next/cache';

import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { AdjustUserVpPayload, ClaimInvoicePayload, InvoiceType, MemberType, ResponseClaimedInvoice, UserCustomization, UserVpHistory } from '@/types/member';

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

export const updateUserCustomization = async (userCode: string, payload: UserCustomization) => {
  const res = await fetcher('updateUserCustomization', { param: userCode, body: payload });
  revalidateTag('get-members')
  revalidateTag(`get-member-${userCode}`)
  return res
};

export const getMemberInvoices = async (options?: ApiOptions) => {
  const res = await fetcher<InvoiceType[]>('getUserInvoices', { ...options, requestOpt: { next: { tags: [`get-invoice-${options?.param}`] } } })
  return res
}

export const getAllClaimedInvoice = async (options?: ApiOptions) => {
  const res = await fetcher<ResponseClaimedInvoice[]>('getAllClaimedInvoice', options)
  return res.data
}

export const claimMemberInvoice = async (member_code: MemberType['user_code'], invoice_id: InvoiceType['invoice_code']) => {
  const claimInvoicePayload: ClaimInvoicePayload = {
    invoice_code: invoice_id
  }

  const res = await fetcher('claimInvoice', { param: member_code, body: claimInvoicePayload })
  revalidateTag(`get-invoices-${member_code}`)
  return res
}

export const deleteMember = async (member_code: MemberType['user_code']) => {
  const res = await fetcher('deleteMember', { param: member_code });
  revalidateTag('get-members')
  return res
};

export const getUserVpHistory = async (member_code: MemberType['user_code'], options: ApiOptions) => {
  return await fetcher<UserVpHistory[]>('getUserVpHistory', { ...options, pagination: { order: 'created_date', sort: 'ASC' }, param: member_code, requestOpt: { next: { tags: [`get-user-${member_code}-vp-history`] } } })
}

export const adjustUserVp = async (member_code: MemberType['user_code'], payload: AdjustUserVpPayload) => {
  const res = await fetcher('adjustUserVp', { param: member_code, body: payload })
  revalidateTag('get-members')
  revalidateTag(`get-member-${member_code}`)
  revalidateTag(`get-user-${member_code}-vp-history`)
  return res
}