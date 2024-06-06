'use client';
import { ColumnDef } from '@tanstack/react-table';
import { AddCircle, Edit, Eye, Setting4 } from 'iconsax-react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import CafeTable from '@/components/PageComponents/CafePage/DataTable';
import AddCafeModal from '@/components/PageComponents/CafePage/Modal/AddCafeModal';
import CafeFilterModal from '@/components/PageComponents/CafePage/Modal/CafeFilterModal';
import CafeStatusConfirmationModal from '@/components/PageComponents/CafePage/Modal/ConfirmationModal';
import EditCafeModal from '@/components/PageComponents/CafePage/Modal/EditCafeModal';
import ViewCafeDetailModal from '@/components/PageComponents/CafePage/Modal/ViewCafeDetailModal';
import { Button } from '@/components/ui/Buttons';
import Search from '@/components/ui/Input/Search';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import Typography from '@/components/ui/Typography';

import { CafeType } from '@/types/cafes';
import { Pagination as PaginationType } from '@/types/network';
import { CityType, ProvinceType } from '@/types/settings';

type Props = {
  data: CafeType[];
  pagination: PaginationType;
  settings: {
    city: CityType[],
    province: ProvinceType[];
  };
};

const CafePageContent = ( { data, pagination, settings }: Props ) => {
  const [ statusConfirmationModalOpen, setStatusConfirmationModalOpen ] = useState<boolean>( false );
  const [ selectedRow, setSelectedRow ] = useState<CafeType>();

  const [ addModalOpen, setAddModalOpen ] = useState<boolean>( false );
  const [ editModalOpen, setEditModalOpen ] = useState<boolean>( false );
  const [ viewDetailOpen, setViewDetailOpen ] = useState<boolean>( false );
  const [ isOpenFilter, setIsOpenFilter ] = useState<boolean>( false );

  const columns: ColumnDef<CafeType>[] = useMemo( () => [
    {
      header: 'Name',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            { row.original.name }
          </Typography>
        );
      }
    },
    {
      header: 'Description',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            { row.original.description }
          </Typography>
        );
      }
    },
    {
      header: 'Address',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular'>
            { row.original.address }
          </Typography>
        );
      }
    },
    {
      header: 'City',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            { row.original.city }
          </Typography>
        );
      }
    },
    {
      header: 'Province',
      cell: ( { row } ) => {
        return (
          <Typography variant='paragraph-l-regular' className='capitalize'>
            { row.original.province }
          </Typography>
        );
      }
    },

    {
      accessorKey: 'status',
      accessorFn: ( row ) => row.status,
      header: 'Status',
      cell: ( { row } ) => {
        return (
          <Select value={ row.original.status }
            onValueChange={ () => {
              setStatusConfirmationModalOpen( true );
              setSelectedRow( row.original );
            } }
          >
            <SelectTrigger variant='badge' className={ cn(
              {
                'bg-error-50': row.original.status === 'inactive',
                'bg-blue-50': row.original.status === 'active'
              }
            ) }>
              <SelectValue aria-label={ row.original.status }>
                <Typography variant='text-body-l-medium' className={ cn(
                  'capitalize',
                  {
                    'text-error-700': row.original.status === 'inactive',
                    'text-blue-700': row.original.status === 'active'
                  }
                ) }>
                  { row.original.status }
                </Typography>
              </SelectValue>
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">In-Active</SelectItem>
            </SelectContent>
          </Select>
        );
      }
    },
    {
      id: 'action',
      header: 'Action',
      cell: ( { row } ) => {
        return (
          <div className='flex flex-row items-center gap-4'>
            <Button variant='link' onClick={ () => {
              setSelectedRow( row.original );
              setViewDetailOpen( true );
            } }>
              <Eye className='cursor-pointer' />
            </Button>
            <Button variant='link' onClick={ () => {
              setSelectedRow( row.original );
              setEditModalOpen( true );
            } }>
              <Edit className='cursor-pointer' />
            </Button>
          </div>
        );
      }
    }
  ]
    , [] );


  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Search />
        <div className='flex flex-row flex-nowrap gap-4'>
          <button className="rounded-[8px] gap-[8px] px-5 py-3 bg-button-midnight-black flex flex-row items-center text-nowrap" onClick={ () => setAddModalOpen( true ) }>
            <AddCircle className='text-white' />
            <Typography variant='paragraph-l-bold' className='text-white'>
              Add New Cafe
            </Typography>
          </button>
          <button className="rounded-[8px] gap-[8px] px-5 py-3 border-gray-300 border flex flex-row items-center text-nowrap" onClick={ () => setIsOpenFilter( true ) }>
            <Setting4 />
            <Typography variant='paragraph-l-bold'>
              Filter
            </Typography>
          </button>
        </div>
      </section>
      <CafeTable data={ data } pagination={ pagination } columnConfig={ columns } />
      <AddCafeModal
        onOpenChange={ ( isopenAddModal: boolean ) => setAddModalOpen( isopenAddModal ) }
        open={ addModalOpen }
        settings={ settings }
      />
      <EditCafeModal
        defaultData={ selectedRow }
        onOpenChange={ ( isOpenEditModal: boolean ) => setEditModalOpen( isOpenEditModal ) }
        open={ editModalOpen }
        settings={ settings }
      />
      <CafeStatusConfirmationModal
        onOpenChange={ ( isOpenConfirmation: boolean ) => setStatusConfirmationModalOpen( isOpenConfirmation ) }
        open={ statusConfirmationModalOpen }
        cafeData={ selectedRow }
      />
      <ViewCafeDetailModal
        cafeData={ selectedRow }
        open={ viewDetailOpen }
        onOpenChange={ ( isOpenViewDetail ) => setViewDetailOpen( isOpenViewDetail ) }
        onEdit={ () => {
          setViewDetailOpen( false );
          setEditModalOpen( true );
        } }
      />
      <CafeFilterModal
        open={ isOpenFilter }
        onOpenChange={ ( isOpenFilter ) => setIsOpenFilter( isOpenFilter ) }
      />
    </div>
  );
};

export default CafePageContent;