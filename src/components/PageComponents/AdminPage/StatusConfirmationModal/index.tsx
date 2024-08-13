'use client';
import { Danger } from 'iconsax-react';
import { PropsWithRef } from 'react';

import { updateStatusAdmin } from '@/lib/api/admin';

import { Button } from '@/components/ui/Buttons';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

import { AdminType } from '@/types/admin';

type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  adminData?: AdminType;
}>;

const StatusConfirmationModal = ({ open, onOpenChange, adminData }: Props) => {
  const { toast } = useToast()

  if (!adminData) return null

  const actionName: string = adminData.status === 'inactive' ? 'active' : 'inactive'
  const actionDisplay: string = actionName === 'active' ? 'activate' : 'inactivate'

  const onConfirm = async () => {
    try {
      const res = await updateStatusAdmin({ param: adminData?.admin_code, body: { status: actionName } });

      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_msg)

      toast({
        title: `Admin successfully ${actionDisplay}d`,
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `failed to ${actionDisplay} the admin`,
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
            Are you sure to {actionDisplay} the admin {adminData.name}?
          </Typography>
        </section>
        <section className='flex gap-6'>
          <Button className='flex-1' size="lg" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className='flex-1' size="lg" variant="default" onClick={onConfirm}>Yes, {actionDisplay}</Button>
        </section>
      </ModalContent>
    </Modal>
  );
};

export default StatusConfirmationModal;