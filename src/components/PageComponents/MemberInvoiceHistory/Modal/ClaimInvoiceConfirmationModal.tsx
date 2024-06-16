'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef, useState } from 'react';

import { claimMemberInvoice } from '@/lib/api/member';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { InvoiceType, MemberType } from '@/types/member';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberData?: MemberType;
  invoiceId?: InvoiceType['invoice_code']
}>;

const ClaimInvoiceConfirmationModal = ({ open, onOpenChange, memberData, invoiceId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()

  if (!memberData || !invoiceId) return null

  const onConfirm = async () => {
    setIsSubmitting(true)

    try {
      const res = await claimMemberInvoice(memberData.user_code, invoiceId)
      toast({
        title: `Successfully claim invoice ${invoiceId} for user ${memberData.fullname}`,
        variant: 'default',
      });

      if (res.stat_code === "ERR:FORBIDDEN") throw new Error("ERR:FORBIDDEN")

    } catch (error) {
      toast({
        title: `Failed to claim invoice ${invoiceId}`,
        description: `make sure you type the correct invoice number`,
        variant: 'destructive',
      });

    }

    onOpenChange(false)
    setIsSubmitting(false)

  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='flex gap-8 flex-col'>
        <section className='flex flex-col items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-brand-blue-electric flex items-center justify-center border-[6px]'>
            <Danger size={32} className='text-white' variant='Bold' />
          </div>
          <Typography variant='heading-h4'>
            Are you sure you want to claim invoice {invoiceId} for user {memberData.fullname}?
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" onClick={onConfirm} disabled={isSubmitting} loading={isSubmitting}>Yes, Claim Invoice</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default ClaimInvoiceConfirmationModal;