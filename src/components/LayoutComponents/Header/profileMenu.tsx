'use client';
import { ArrowDown2 } from 'iconsax-react';

import { logOut } from '@/lib/api/server/auth';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import Typography from '@/components/ui/Typography';

// type Props = PropsWithRef<PropsWithChildren>;

const ProfileMenu = () => {

  const onLogout = async () => {
    await logOut();
  };

  return (
    <>

      <Popover>
        <PopoverTrigger asChild>
          <ArrowDown2 className='text-gray-400 cursor-pointer' />
        </PopoverTrigger>
        <PopoverContent className='rounded-xl mr-3'>
          <div onClick={ onLogout }>
            <Typography variant='text-body-l-regular' className='cursor-pointer' >
              Log Out
            </Typography>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProfileMenu;