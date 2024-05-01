import { useEffect, useState } from 'react';

import { cookiesHelper } from '@/helper';

import { UserData } from '@/types/users';

const useUserData = () => {
  const [ userData, setUserData ] = useState<UserData>();

  useEffect( () => {
    getUserData();
  }, [] );

  const getUserData = async () => {
    const data = await cookiesHelper.getUserData();
    setUserData( data );
  };

  return userData;
};

export default useUserData;