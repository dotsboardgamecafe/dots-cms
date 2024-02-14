'use client';

import Head from 'next/head';
import * as React from 'react';



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

export default function HomePage () {
  return (
    <main className='bg-slate-500'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='h-screen flex align-middle justify-center items-center gap-6' >

      </section>
    </main>
  );
}
