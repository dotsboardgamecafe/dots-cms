import { PropsWithChildren, PropsWithRef } from 'react';

import Notification from '@/components/LayoutComponents/Header/notification';
import Profile from '@/components/LayoutComponents/Header/profile';
import ProfileMenu from '@/components/LayoutComponents/Header/profileMenu';
import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<PropsWithChildren<{
  title: string;
  subtitle?: string;
}>>;

const Header = ( { title, subtitle }: Props ) => {

  return (
    <section className='flex'>
      <div className='flex flex-col'>
        <Typography variant='heading-h4' color='neutral-ink'>
          { title }
        </Typography>
        <Typography variant='paragraph-xl-regular' className='text-gray-500'>
          { subtitle }
        </Typography>
      </div>
      <div className='flex flex-1 justify-end items-center gap-6'>
        <Notification />
        <Profile />
        <ProfileMenu />
      </div>
    </section>
  );
};

export default Header;