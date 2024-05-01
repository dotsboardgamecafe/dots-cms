import fetcher, { ApiOptions } from '@/lib/api/utils/fetcher';

import { MemberType } from '@/types/member';

export const getMembers = async ( options?: ApiOptions ) => {
  return await fetcher<MemberType[]>( 'getMembers', options );
};

export const updateStatusMembers = async ( options: ApiOptions ) => {
  return await fetcher( 'changeStatusMember', options );
};