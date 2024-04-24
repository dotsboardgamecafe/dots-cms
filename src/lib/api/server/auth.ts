import fetcher from '@/lib/api/utils/fetcher';

import { cookiesHelper } from '@/helper';

import { LoginPayload, UserData } from '@/types/users';

export const login = async ( loginPayload: LoginPayload ) => {
  const loginRes = await fetcher<UserData>( 'login', { body: loginPayload } );

  if ( loginRes.stat_code === 'APP:SUCCESS' ) {
    const userLogin = loginRes?.data;
    await cookiesHelper.setTokenUser( userLogin.token || '' );

    cookiesHelper.setUserData( JSON.stringify( {
      ...userLogin
    } ) );
  }

  return loginRes;
};