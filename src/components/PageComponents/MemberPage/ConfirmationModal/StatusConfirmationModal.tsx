'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef } from 'react';

import { updateStatusMembers } from '@/lib/api/member';

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

const StatusConfirmationModal = ({ open, onOpenChange, memberData }: Props) => {
  const { toast } = useToast()
  const actionTypeMessage: string = memberData?.status === 'active' ? 'inactivate' : 'activate'
  const actionType: string = memberData?.status === 'active' ? 'inactive' : 'active'

  const onConfirm = async () => {
    try {
      const res = await updateStatusMembers({ param: memberData?.user_code, body: { status: actionType } });
      if (res.stat_msg?.includes('err')) {
        throw new Error(res.stat_msg)
      }

      toast({
        title: `Successfully ${actionTypeMessage} a member ${memberData?.fullname || ''}`,
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `failed to ${actionTypeMessage} a member ${memberData?.fullname || ''}`,
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
            Are you sure to {actionTypeMessage} this member?
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" onClick={onConfirm}>Yes, {actionTypeMessage}</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default StatusConfirmationModal;