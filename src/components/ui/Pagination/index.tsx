import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { PropsWithChildren, PropsWithRef } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<PropsWithChildren<{
  onPrevious?: () => void;
  onNext?: () => void;
  currentPage?: number;
  totalPages?: number;
  totalItems: number;
  itemsPerPage: number;
  onChangePage: ( page: number ) => void;
  onChangeItemsPerPage?: ( items: number ) => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
  from?: number;
  to?: number;
}>>;

const PaginationDeprecated = ( {
  onNext,
  onPrevious,
  prevDisabled = false,
  nextDisabled = false,
  onChangePage,
  totalPages,
  currentPage,
  totalItems,
  onChangeItemsPerPage,
  itemsPerPage,
  from,
  to
}: Props ) => {

  return (
    <div className='pagination-wrapper'>
      <section className='pagination-page-size'>
        <Typography variant='text-body-m-regular' className='text-gray-500'>
          Showing
        </Typography>
        <Select value={ itemsPerPage.toString() } onValueChange={ ( val ) => { onChangeItemsPerPage && onChangeItemsPerPage( +val ); } }>
          <SelectTrigger>
            <SelectValue aria-label="5">
              { itemsPerPage.toString() }
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
          Showing { from } to { to } out of { totalItems } Items
        </Typography>
      </section>

      <section className='pagination-navigation'>
        <button onClick={ onPrevious } disabled={ prevDisabled }>
          <ArrowLeft2 className={ prevDisabled ? 'text-gray-400' : '' } />
        </button>
        <section className='pagination-pages'>
          {
            Array.from( { length: totalPages ?? 1 } ).map( ( _, index ) => (
              <button className={ index + 1 === currentPage ? 'active' : '' } key={ index } onClick={ () => onChangePage?.( index + 1 ) }>
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

export default PaginationDeprecated;