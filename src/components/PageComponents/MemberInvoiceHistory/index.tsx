'use client';
import { ColumnDef } from '@tanstack/react-table';
import { SearchNormal1 } from 'iconsax-react';
import { PropsWithRef, useState } from 'react';

import ClaimInvoiceConfirmationModal from '@/components/PageComponents/MemberInvoiceHistory/Modal/ClaimInvoiceConfirmationModal';
import ClaimHistoryTable from '@/components/PageComponents/MemberInvoiceHistory/Table/claim-history';
import { Button } from '@/components/ui/Buttons';
import Text from '@/components/ui/Input/Text';
import Typography from '@/components/ui/Typography';

import { InvoiceItemType, InvoiceType, MemberType } from '@/types/member';
import { Pagination as PaginationRes } from '@/types/network';

type Props = PropsWithRef<{
  data: InvoiceType[];
  pagination: PaginationRes;
  memberData: MemberType
}>;

const MemberInvoicePage = ({ memberData, data, pagination }: Props) => {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);
  const [newInvoice, setNewInvoice] = useState<string>('');

  const columns: ColumnDef<InvoiceType>[] = [
    {
      accessorKey: 'claimed_date',
      header: 'Date',
      cell: ({ row }) => {
        return (
          <section className='flex flex-row items-center gap-[10px]'>
            <Typography variant='paragraph-l-regular'>
              {row.original.claimed_date}
            </Typography>
          </section>
        );
      }
    },
    {
      accessorKey: 'invoice_code',
      header: 'Invoice Number',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.invoice_code}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'board_game',
      header: 'Board Game',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.invoice_items.reduce((itemsDisplay: string, invoiceItem: InvoiceItemType): string => {
              if (!itemsDisplay) return invoiceItem.name
              return `${itemsDisplay}, ${invoiceItem.name}`
            }, '')}
          </Typography>
        );
      }
    },
    {
      accessorKey: 'transaction_amount',
      header: 'Transaction Amount',
      cell: ({ row }) => {
        return (
          <Typography variant='paragraph-l-regular'>
            {row.original.invoice_amount}
          </Typography>
        );
      }
    }
  ];

  return (
    <div className='flex flex-col gap-6'>
      <section className='table-action'>
        <Text className='max-w-[300px]' prefixIcon={<SearchNormal1 size={20} className='text-gray-500 ' />} placeholder='Input Invoice Number' value={newInvoice} onChange={(event) => setNewInvoice(event.target.value)} />
        <Button variant="default" size="md" onClick={() => setConfirmationModalOpen(true)} disabled={!newInvoice}>
          <Typography variant='paragraph-l-bold'>
            Claim Invoice
          </Typography>
        </Button>
      </section>
      <ClaimHistoryTable columnConfig={columns} data={data} pagination={pagination} />
      <ClaimInvoiceConfirmationModal
        open={confirmationModalOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) setNewInvoice('')
          setConfirmationModalOpen(isOpen)
        }}
        memberData={memberData}
        invoiceId={newInvoice}
      />
    </div>
  );
};

export default MemberInvoicePage;