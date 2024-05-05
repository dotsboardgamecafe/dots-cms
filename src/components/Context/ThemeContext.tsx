/* eslint-disable @typescript-eslint/no-empty-function */
'use client';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

const BreacrumbContext = createContext<[ string[], Dispatch<SetStateAction<string[]>> ]>( [ [], () => { } ] );
const PageTitleContext = createContext<[ string, Dispatch<SetStateAction<string>> ]>( [ '', () => { } ] );

type Props = PropsWithChildren;

export const Providers = ( { children }: Props ) => {
  const breadcrumbState = useState<string[]>( [] );
  const pageTitleState = useState<string>( 'Please set Page Title' );

  return (
    <BreacrumbContext.Provider value={ breadcrumbState }>
      <PageTitleContext.Provider value={ pageTitleState }>
        { children }
      </PageTitleContext.Provider>
    </BreacrumbContext.Provider>
  );
};

export const useBreadcrumbs = () => useContext( BreacrumbContext );
export const usePageTitle = () => useContext( PageTitleContext );