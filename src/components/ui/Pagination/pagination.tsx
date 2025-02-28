'use client';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, PropsWithChildren, PropsWithRef, useMemo, useState } from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/ButtonDropdown';
import { Button } from '@/components/ui/Buttons';
import InputNumber from '@/components/ui/Input/Number';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

import { Pagination as PaginationType } from '@/types/network';

type Props = PropsWithRef<PropsWithChildren<{
  pagination: PaginationType;
}>>;

type NavigationButtonProps = {
  page: number,
  isActive?: boolean,
  maxPage: number,
  onClick?: (page: number) => void
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ page, maxPage, onClick, isActive }) => {
  const [selectedPage, setSelectedPage] = useState<number>()

  if (!isActive) return (
    <Button variant='ghost' onClick={() => onClick?.(page)}>
      <Typography variant='text-body-l-regular'>
        {page}
      </Typography>
    </Button>
  )

  const handleGoToPage = () => {
    if (!selectedPage) return

    onClick?.(selectedPage)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value || 1)

    if (value > maxPage) return setSelectedPage(maxPage)
    setSelectedPage(value)
  }

  return (
    <DropdownMenu onOpenChange={() => !isActive && onClick?.(page)}>
      <DropdownMenuTrigger variant='secondary' size='lg' className='gap-4'>
        {/* <button className={isActive ? 'active' : ''} key={page} onClick={() => onClick?.(page)}> */}
        <Typography variant='text-body-l-regular'>
          {page}
        </Typography>
        {/* </button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-gray-50 shadow-md'>
        <form className='flex flex-row gap-2 items-center' onSubmit={(e) => e.preventDefault()}>
          <div className='flex flex-col'>
            <InputNumber value={selectedPage} onChange={handleChange} max={maxPage} type='number' placeholder='Go to page?' className='bg-inherit' />
          </div>
          <Button variant='default' onClick={() => handleGoToPage()}>Go!</Button>
        </form>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const Pagination = ({
  pagination,
}: Props) => {

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const currentPage = pagination.page || 1
  const totalPage = useMemo(() => {
    if (pagination.count && pagination.limit) {
      return Math.ceil(pagination.count / pagination.limit);
    }
    return 0;
  }, [pagination.count, pagination.limit])

  const pageList: number[] = useMemo(() => {
    const pages: number[] = [currentPage]
    let gaps: number = (totalPage > 5 ? 5 : totalPage) - 1
    let counter = 1

    while (gaps > 0) {
      const prevPage: number = currentPage - counter
      let nextPage: number = currentPage + counter

      if (prevPage > 0) pages.unshift(prevPage)
      else {
        pages.push(nextPage)
        counter++
        nextPage = currentPage + counter
      }

      gaps--
      if (!gaps) break

      if (nextPage <= totalPage) pages.push(nextPage)
      else {
        counter++
        pages.unshift(prevPage - 1)
      }

      gaps--
      counter++
    }

    return pages
  }, [totalPage, currentPage])

  const onPrevious = () => {
    if (pagination.page && pagination.page > 1) {
      const params = new URLSearchParams(searchParams);
      params.set('page', (pagination.page - 1).toString());
      router.push(`${pathName}?${params.toString()}`);
    }
  };

  const onNext = () => {
    if (pagination.page && pagination.page < totalPage) {
      const params = new URLSearchParams(searchParams);
      params.set('page', (pagination.page + 1).toString());
      router.push(`${pathName}?${params.toString()}`);
    }
  };

  const getFrom = () => {
    if (pagination.page && pagination.limit) {
      return (pagination.page - 1) * pagination.limit + 1;
    }
    return 0;
  };

  const getTo = () => {
    if (pagination.page === totalPage) return pagination.count;
    if (pagination.page && pagination.limit) {
      return pagination.page * pagination.limit;
    }
    return 0;
  };

  const prevDisabled = pagination.page === 1;
  const nextDisabled = pagination.page === totalPage;

  const onChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${pathName}?${params.toString()}`);
  };

  const onChangeItemsPerPage = (items: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', items.toString());
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <div className='pagination-wrapper'>
      <section className='pagination-page-size'>
        <Typography variant='text-body-m-regular' className='text-gray-500'>
          Showing
        </Typography>
        <Select value={`${pagination.limit}`} onValueChange={(val) => { onChangeItemsPerPage && onChangeItemsPerPage(+val); }}>
          <SelectTrigger>
            <SelectValue aria-label="5">
              {pagination.limit?.toString()}
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
          Showing {getFrom()} to {getTo()} out of {pagination.count} Items
        </Typography>
      </section>

      {pageList.length > 1 && (
        <section className='pagination-navigation'>
          <button onClick={onPrevious} disabled={prevDisabled}>
            <ArrowLeft2 className={prevDisabled ? 'text-gray-400' : ''} />
          </button>
          <section className='pagination-pages'>
            {
              pageList.map((page) => <NavigationButton maxPage={totalPage} page={page} isActive={page === pagination.page} onClick={onChangePage} key={page} />)
            }
          </section>
          <button onClick={onNext} disabled={nextDisabled}>
            <ArrowRight2 className={nextDisabled ? 'text-gray-400' : ''} />
          </button>
        </section>
      )}
    </div>
  );
};

export default Pagination;