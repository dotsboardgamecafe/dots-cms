'use client';
import Image from 'next/image';

import Typography from '@/components/ui/Typography';

import useUserData from '@/helper/hooks/useUserData';

// type Props = PropsWithRef<PropsWithChildren>;

const Profile = () => {

  const userData = useUserData();


  return (
    <div className='flex items-center gap-2'>
      <Image src={ userData?.image_url || '/images/avatar-not-found.png' } alt="profile" width={ 48 } height={ 48 } className='rounded-full' />
      <div className='flex flex-col justify-between'>
        <Typography variant='text-body-l-medium' className='capitalize'>
          { userData?.fullname }
        </Typography>
        <Typography variant='text-body-s-regular' className='text-gray-500 capitalize'>
          { userData?.actor_type }
        </Typography>
      </div>
    </div>
  );
};

export default Profile;