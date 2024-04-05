'use client';
import Link from 'next/link';
import { PropsWithChildren, PropsWithRef } from 'react';

import Checkbox from '@/components/ui/Input/Checkbox';
import Password from '@/components/ui/Input/Password';
import Text from '@/components/ui/Input/Text';
import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<PropsWithChildren>;

const LoginForm = ( { children }: Props ) => {

  return (
    <section>
      <section id='login-heading' className='flex flex-col mb-[30px]'>
        <Typography variant='heading-h3' color='neutral-ink'>
          Welcome&#128075;
        </Typography>
        <Typography variant='text-body-l-regular' className='text-gray-500'>
          Please login here
        </Typography>
      </section>
      <section id='login-form' className='flex flex-col gap-5'>
        <Text placeholder='Enter email address' label='Email' />
        <Password placeholder='Enter password' label='Password' toggler />
        <div className='flex flex-row justify-between'>
          <Checkbox label='Remember me' />
          <Link href="#">
            <Typography variant='text-body-l-regular' color='brand-blue-electric'>
              Forgot Password?
            </Typography>
          </Link>
        </div>
        <button
          className="rounded-[8px] px-5 py-3 bg-button-midnight-black"
        >
          <Typography variant='paragraph-l-bold' className='text-white'>
            Log In
          </Typography>
        </button>
      </section>
    </section>
  );
};

export default LoginForm;