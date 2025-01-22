'use client'
import Image from 'next/image';

import MdxLayout from '@/markdown/markdownLayout';
import PrivacyPolicyMD from '@/markdown/privacy-policy.mdx';
const PrivacyPolicyPage = () => {
  return (
    <div className='flex justify-center items-center p-16 flex-col gap-8'>
      <Image src="/images/logo-dots.png" alt='company-logo' width={140} height={140}
        style={{ width: '140px', height: 'fit-content' }} />
      <div className='py-4 px-16 drop-shadow-lg rounded-3xl bg-white border-2 border-gray-200 relative'>
        <MdxLayout>
          <PrivacyPolicyMD />
        </MdxLayout>
      </div>
    </div>
  );
};
export default PrivacyPolicyPage;