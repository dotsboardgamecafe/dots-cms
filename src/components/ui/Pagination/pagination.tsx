'use client';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PropsWithChildren, PropsWithRef } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

import { Pagination as PaginationType } from '@/types/network';

type Props = PropsWithRef<PropsWithChildren<{
  pagination: PaginationType;
}>>;

const Pagination = ( {
  pagination,
}: Props ) => {

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const onPrevious = () => {
    if ( pagination.page && pagination.page > 1 ) {
      const params = new URLSearchParams( searchParams );
      params.set( 'page', ( pagination.page - 1 ).toString() );
      router.push( `${pathName}?${params.toString()}` );
    }
  };

  const onNext = () => {
    if ( pagination.page && pagination.page < totalPage() ) {
      const params = new URLSearchParams( searchParams );
      params.set( 'page', ( pagination.page + 1 ).toString() );
      router.push( `${pathName}?${params.toString()}` );
    }
  };

  const totalPage = () => {
    if ( pagination.count && pagination.limit ) {
      return Math.ceil( pagination.count / pagination.limit );
    }
    return 0;
  };

  const getFrom = () => {
    if ( pagination.page && pagination.limit ) {
      return ( pagination.page - 1 ) * pagination.limit + 1;
    }
    return 0;
  };

  const getTo = () => {
    if ( pagination.page === totalPage() ) return pagination.count;
    if ( pagination.page && pagination.limit ) {
      return pagination.page * pagination.limit;
    }
    return 0;
  };

  const prevDisabled = pagination.page === 1;
  const nextDisabled = pagination.page === totalPage();

  const onChangePage = ( page: number ) => {
    const params = new URLSearchParams( searchParams );
    params.set( 'page', page.toString() );
    router.push( `${pathName}?${params.toString()}` );
  };

  const onChangeItemsPerPage = ( items: number ) => {
    const params = new URLSearchParams( searchParams );
    params.set( 'limit', items.toString() );
    router.push( `${pathName}?${params.toString()}` );
  };

  return (
    <div className='pagination-wrapper'>
      <section className='pagination-page-size'>
        <Typography variant='text-body-m-regular' className='text-gray-500'>
          Showing
        </Typography>
        <Select value={ `${pagination.limit}` } onValueChange={ ( val ) => { onChangeItemsPerPage && onChangeItemsPerPage( +val ); } }>
          <SelectTrigger>
            <SelectValue aria-label="5">
              { pagination.limit?.toString() }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5" defaultChecked>5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className='pagination-page-size'>
        <Typography variant='text-body-m-regular'>
          Showing { getFrom() } to { getTo() } out of { pagination.count } Items
        </Typography>
      </section>

      <section className='pagination-navigation'>
        <button onClick={ onPrevious } disabled={ prevDisabled }>
          <ArrowLeft2 className={ prevDisabled ? 'text-gray-400' : '' } />
        </button>
        <section className='pagination-pages'>
          {
            Array.from( { length: totalPage() } ).map( ( _, index ) => (
              <button className={ index + 1 === pagination.page ? 'active' : '' } key={ index } onClick={ () => onChangePage( index + 1 ) }>
                <Typography variant='text-body-l-regular'>
                  { index + 1 }
                </Typography>
              </button>
            ) )
          }
        </section>
        <button onClick={ onNext } disabled={ nextDisabled }>
          <ArrowRight2 className={ nextDisabled ? 'text-gray-400' : '' } />
        </button>
      </section>
    </div>
  );
};

export default Pagination;