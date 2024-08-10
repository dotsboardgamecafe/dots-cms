'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef } from 'react';

import { deleteMember } from '@/lib/api/member';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { MemberType } from '@/types/member';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberData?: MemberType;
}>;

const DeleteConfirmationModal = ({ open, onOpenChange, memberData }: Props) => {
  const { toast } = useToast()

  if (!memberData?.user_code) return null

  const onConfirm = async () => {
    try {
      const res = await deleteMember(memberData.user_code);
      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_msg)

      toast({
        title: `Successfully delete a member ${memberData?.fullname || ''}`,
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `failed to delete a member ${memberData?.fullname || ''}`,
        variant: 'destructive',
      });
    }
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <ModalContent hideCloseIcon className='flex gap-8 flex-col'>
        <section className='flex flex-col items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-brand-blue-electric flex items-center justify-center border-[6px]'>
            <Danger size={32} className='text-white' variant='Bold' />
          </div>
          <Typography variant='heading-h4'>
            Are you sure to delete this member?
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" onClick={onConfirm}>Yes, Delete</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;