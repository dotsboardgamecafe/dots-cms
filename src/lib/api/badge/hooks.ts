'use client'



import { useEffect } from "react"

import fetcher, { ApiOptions } from "@/lib/api/utils/fetcher"

import { useAsyncLoader, UseAsyncLoaderReturnType } from "@/helper/hooks/useAsyncLoader"

import { BadgeType, TournamentBadgeType } from "@/types/badge"
import { ResponseType } from "@/types/network"

export const useBadgeDetail = (badgeCode: string, options?: ApiOptions): UseAsyncLoaderReturnType<BadgeType> => {
  const fetchReturn = useAsyncLoader<ResponseType<BadgeType>>(() => fetcher<BadgeType>('getBadges', { param: badgeCode, ...options, requestOpt: { next: { tags: [`get-badge-${badgeCode}`] } } }))

  useEffect(() => {
    if (!badgeCode) return
    fetchReturn.run()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badgeCode])

  return { ...fetchReturn, data: fetchReturn.data?.data }
}

export const useTournamentBadgeDetail = (badgeCode: string, options?: ApiOptions): UseAsyncLoaderReturnType<TournamentBadgeType[]> => {
  const fetchReturn = useAsyncLoader<ResponseType<TournamentBadgeType[]>>(() => fetcher<TournamentBadgeType[]>('getTournamentBadgeDetails', { param: badgeCode, ...options, requestOpt: { next: { tags: [`get-tournament-badge-${badgeCode}`] } } }))

  useEffect(() => {
    if (!badgeCode) return
    fetchReturn.run()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badgeCode])

  return { ...fetchReturn, data: fetchReturn.data?.data }
}