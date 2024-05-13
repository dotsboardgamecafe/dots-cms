'use server';
import { redirect, RedirectType } from 'next/navigation';

import fetcher from '@/lib/api/utils/fetcher';

import { cookiesHelper } from '@/helper';

import { LoginPayload, UserData } from '@/types/users';

export const login = async ( loginPayload: LoginPayload ) => {
  const loginRes = await fetcher<UserData>( 'login', { body: loginPayload } );

  if ( loginRes.stat_code === 'APP:SUCCESS' ) {
    const userLogin = loginRes?.data;
    await cookiesHelper.setTokenUser( userLogin.token || '' );

    await cookiesHelper.setUserData( JSON.stringify( {
      ...userLogin
    } ) );
  }

  return loginRes;
};

export const logOut = async () => {
  await cookiesHelper.clearStorage();
  await cookiesHelper.clearToken();
  redirect( '/login', RedirectType.push );
};