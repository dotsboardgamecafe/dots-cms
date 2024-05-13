'use client';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';

export default function Error ( {
  error,
  reset,
}: {
  error: Error & { stat_code?: string, stat_msg?: string; };
  reset: () => void;
} ) {
  const errJson = JSON.parse( error.message );
  return (
    <>
      <Header title='Room Play' subtitle={ [ {
        label: 'All Room Play Information',
        link: '/room'
      } ] } />
      <PageContainer>
        <h2 className='text-xl font-bold'>Something went wrong!</h2>
        <pre className='bg-red-200 p-4 rounded-lg mt-2'>
          {
            JSON.stringify( errJson, null, 2 )
          }
        </pre>
      </PageContainer>
    </>
  );
}