import { PropsWithChildren, PropsWithRef } from 'react';

import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<PropsWithChildren>;

const LoginForm = ( { children }: Props ) => {

  return (
    <>
      <section id='login-heading' className='flex flex-col'>
        <Typography variant='heading-h3' color='neutral-ink'>
          Welcome&#128075;
        </Typography>
        <Typography variant='text-body-l-regular' className='text-gray-500'>
          Please login here
        </Typography>
      </section>
    </>
  );
};

export default LoginForm;