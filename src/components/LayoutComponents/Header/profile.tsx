import Image from 'next/image';

import Typography from '@/components/ui/Typography';

// type Props = PropsWithRef<PropsWithChildren>;

const Profile = () => {

  return (
    <div className='flex items-center gap-2'>
      <Image src="https://i.pravatar.cc/500" alt="profile" width={ 48 } height={ 48 } className='rounded-full' />
      <div className='flex flex-col justify-between'>
        <Typography variant='text-body-l-medium'>
          Melati Putri
        </Typography>
        <Typography variant='text-body-s-regular' className='text-gray-500'>
          Admin
        </Typography>
      </div>
    </div>
  );
};

export default Profile;