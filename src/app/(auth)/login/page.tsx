'use server';
import Image from 'next/image';
import * as React from 'react';

import LoginForm from '@/components/PageComponents/LoginPage/LoginForm';



/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default async function LoginPage ( { searchParams }: { searchParams: { err: string; }; } ) {

  return (
    <section className='h-screen grid grid-cols-[1fr_auto] gap-16 align-middle justify-center items-center p-8 pr-[103px]'>
      <div className='h-full rounded-[32px] bg-[#EEEEF9]  relative'>
        <Image src="/images/login_figure.png" alt="login image" sizes="100vw" fill
          style={ { objectFit: 'cover' } } priority={ true } />
      </div>
      {/* Form Section */ }
      <div className='w-[465px] flex-col gap-10 flex '>
        <Image src="/images/logo.png" alt='logo image' width={ 140 } height={ 64 } style={ { width: '140px', height: '64px' } } />
        <LoginForm />
      </div>
    </section>
  );
}
