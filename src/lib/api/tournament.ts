"use server"

import { revalidateTag } from 'next/cache';

import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { AddTournamentPayload, SetTournamentWinnerType, TournamentDetailType, TournamentType } from '@/types/tournament';

export const getTournaments = async (options?: ApiOptions) => {
  return await fetcher<TournamentType[]>('getTournaments', { ...options, requestOpt: { next: { tags: ['getTournaments'] } } });
};

export const getTournamentDetail = async (tournamentId: string) => {
  return await fetcher<TournamentDetailType>('getTournaments', { param: tournamentId, requestOpt: { next: { tags: [`get-tournament-${tournamentId}`] } } })
}

export const addTournament = async (options: ApiOptions<AddTournamentPayload>) => {
  const res = await fetcher('addTournaments', options);
  revalidateTag('getTournaments');
  return res;
};

export const editTournament = async (options: ApiOptions<AddTournamentPayload>) => {
  const res = await fetcher('editTournaments', options);
  revalidateTag('getTournaments');
  revalidateTag(`get-tournament-${options.param}`);
  return res;
};

export const setTournamentWinner = async (options: ApiOptions<SetTournamentWinnerType>) => {
  const res = await fetcher('setTournamentWinner', options)
  revalidateTag('getTournaments');
  revalidateTag(`get-tournament-${options.param}`);
  return res
}

export const updateTournamentsStatus = async (tournament_code: TournamentType['tournament_rules'], status: 'active' | 'inactive') => {
  const res = await fetcher('updateTournamentsStatus', { param: tournament_code, body: { status } });
  revalidateTag('getTournaments');
  revalidateTag(`get-tournament-${tournament_code}`);
  return res;
};

export const deleteTournament = async (tournament_code: TournamentType['tournament_code']) => {
  const res = await fetcher('deleteTournament', { param: tournament_code });
  revalidateTag('getTournaments');
  revalidateTag(`get-tournament-${tournament_code}`);
  return res;
};