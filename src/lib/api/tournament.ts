import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { TournamentType } from '@/types/tournament';

export const getTournaments = async ( options?: ApiOptions ) => {
  return await fetcher<TournamentType[]>( 'getTournaments', options );
};