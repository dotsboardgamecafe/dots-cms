'use server'

import { revalidateTag } from "next/cache";

import fetcher, { ApiOptions } from "@/lib/api/utils/fetcher";

import { BadgePostPayloadType, BadgeType, TournamentBadgePayloadType, TournamentBadgeType } from "@/types/badge";

export const getBadges = async (options?: ApiOptions) => {
  return await fetcher<BadgeType[]>('getBadges', {
    ...options, requestOpt: {
      next: {
        tags: ['getBadges']
      }
    }
  });
};

export const addBadges = async (options?: ApiOptions<BadgePostPayloadType>) => {
  const res = await fetcher('addBadges', options);
  revalidateTag('getBadges');
  return res
}

export const editBadges = async (options?: ApiOptions<BadgePostPayloadType>) => {
  const res = await fetcher('editBadges', options);
  revalidateTag('getBadges');
  return res
}

export const addTournamentBadge = async (options?: ApiOptions<TournamentBadgePayloadType>) => {
  const res = await fetcher('addTournamentBadge', options);
  revalidateTag('getBadges');
  return res
}

export const editTournamentBadge = async (options?: ApiOptions<TournamentBadgePayloadType>) => {
  const res = await fetcher('editTournamentBadge', options);
  revalidateTag('getBadges');
  return res
}

export const getBadgeDetail = (badgeCode: string, options?: ApiOptions) => {
  return fetcher<BadgeType>('getBadges', { ...options, param: badgeCode })
}

export const getTournamentBadgeDetail = (badgeCode: string, options?: ApiOptions) => {
  return fetcher<TournamentBadgeType[]>('getTournamentBadgeDetails', { ...options, param: badgeCode })
}