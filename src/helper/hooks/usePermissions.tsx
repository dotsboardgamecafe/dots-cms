import { useEffect, useState } from 'react';

import { cookiesHelper } from '@/helper';


const usePermissions = () => {
  const [ permissions, setPermissions ] = useState<string[]>();

  useEffect( () => {
    getUserData();
  }, [] );

  const getUserData = async () => {
    const data = await cookiesHelper.getUserPermission();
    setPermissions( data );
  };



  return permissions;
};

export default usePermissions;