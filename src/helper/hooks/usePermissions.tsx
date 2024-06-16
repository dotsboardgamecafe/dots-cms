import { useEffect, useState } from 'react';

import { cookiesHelper } from '@/helper';

export type EnhancedPermissionType = { [key: string]: boolean | undefined }

const usePermissions = () => {
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const data = await cookiesHelper.getUserPermission();
    setPermissions(data);
  };

  return permissions;
};

export default usePermissions;