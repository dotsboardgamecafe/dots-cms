'use server';

import fetcher from '@/lib/api/utils/fetcher';

import { cookiesHelper } from '@/helper';

import { LoginPayload, UserData } from '@/types/users';

export const login = async ( loginPayload: LoginPayload ) => {
  const loginRes = await fetcher<UserData>( 'login', { body: loginPayload } );

  if ( loginRes.stat_code === 'APP:SUCCESS' ) {
    const { token, permissions, ...rest } = loginRes.data;
    const permission_string = permissions.map( perm => perm.name );
    await cookiesHelper.setTokenUser( token || '' );
    await cookiesHelper.setUserPermissions( permission_string );
    await cookiesHelper.setUserData( JSON.stringify( {
      ...rest
    } ) );
  }

  return loginRes;
};

export const logOut = async () => {
  await cookiesHelper.clearStorage();
  await cookiesHelper.clearToken();
};

export const clearCookies = async () => {
  await cookiesHelper.clearToken();
  await cookiesHelper.clearStorage();
};