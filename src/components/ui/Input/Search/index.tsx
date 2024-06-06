'use client';
import { SearchNormal1 } from 'iconsax-react';
import { debounce } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

import Text from '@/components/ui/Input/Text';



const Search = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [ searchKeyword, setSearchKeyword ] = useState<string>( searchParams.get( 'keyword' ) || '' );

  const onSearchKeyword = ( evt: ChangeEvent<HTMLInputElement> ) => {
    const { value } = evt.target;
    setSearchKeyword( value );
    debounced( value );
  };
  const onDebounced = ( value: string ) => {
    router.push( pathName + '?' + new URLSearchParams( { keyword: value } ).toString() );
  };

  const debounced = debounce( onDebounced, 500 );
  return (
    <>
      <Text className='max-w-[300px]' value={ searchKeyword } onChange={ onSearchKeyword } prefixIcon={ <SearchNormal1 size={ 20 } className='text-gray-500 ' /> } placeholder='Search...' />
    </>
  );
};

export default Search;