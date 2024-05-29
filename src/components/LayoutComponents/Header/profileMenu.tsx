'use client';
import { ArrowDown2 } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { logOut } from '@/lib/api/server/auth';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import Typography from '@/components/ui/Typography';

// type Props = PropsWithRef<PropsWithChildren>;

const ProfileMenu = () => {
  const [ loading, setLoading ] = useState( false );
  const router = useRouter();
  const onLogout = async () => {
    try {
      setLoading( true );
      await logOut();
      router.push( '/login' );
    } catch ( error ) {
      setLoading( false );
    } finally {
      setLoading( false );
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <ArrowDown2 className='text-gray-400 cursor-pointer' />
        </PopoverTrigger>
        <PopoverContent className='rounded-xl mr-3'>
          <div onClick={ onLogout }>
            {
              loading
                ?
                <Typography variant='text-body-l-regular' className='cursor-pointer' >
                  Logging Out...
                </Typography>
                :
                <Typography variant='text-body-l-regular' className='cursor-pointer' >
                  Log Out
                </Typography>
            }

          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProfileMenu;