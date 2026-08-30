'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { MultiValue } from 'react-select';

import { addRoomParticipant } from '@/lib/api/room';

import ConfirmationModal from '@/components/PageComponents/RoomPage/RoomDetail/ConfirmationModal';
import { Button } from '@/components/ui/Buttons';
import SelectMembers, { MemberOptionType } from '@/components/ui/Input/SelectMultiple/SelectMembers';
import { useToast } from '@/components/ui/Toast/use-toast';
import Typography from '@/components/ui/Typography';

type Props = {
  roomCode: string;
  availableSlots: number;
  joinedUserCodes: string[];
  onClose: () => void;
};

const AddParticipantsForm = ({ roomCode, availableSlots, joinedUserCodes, onClose }: Props) => {
  const [selectedMembers, setSelectedMembers] = useState<MultiValue<MemberOptionType>>([]);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isRefreshing || isPending) return;

    setIsRefreshing(false);
    setIsSubmitting(false);
    setIsOpenConfirmation(false);
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, isRefreshing]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await addRoomParticipant({
        body: { user_codes: selectedMembers.map((member) => member.value) },
        param: roomCode,
      });
      if (res.stat_code?.includes('ERR')) throw new Error(res.stat_msg);

      toast({
        title: `Successfully added ${selectedMembers.length} participant(s)`,
        variant: 'default',
      });
      setIsRefreshing(true);
      startTransition(() => {
        router.refresh();
      });
      return;
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: error instanceof Error ? error.message : 'failed to add participants',
        variant: 'destructive',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className='flex flex-col gap-6 flex-grow overflow-y-auto'>
      <div className='flex flex-col gap-3'>
        <Typography variant='paragraph-l-medium'>
          Participants
        </Typography>
        <SelectMembers
          value={selectedMembers}
          onChange={setSelectedMembers}
          maxSelectable={availableSlots}
          excludeUserCodes={joinedUserCodes}
        />
        <Typography variant='paragraph-m-regular' className='text-gray-500'>
          {selectedMembers.length} of {availableSlots} slot(s) selected
        </Typography>
      </div>
      <section className='flex gap-6'>
        <Button variant="secondary" size='lg' className='flex-1' disabled={isSubmitting} onClick={onClose}>Cancel</Button>
        <Button
          variant="default"
          size='lg'
          className='flex-1'
          disabled={selectedMembers.length === 0 || isSubmitting}
          onClick={() => setIsOpenConfirmation(true)}
        >
          Add
        </Button>
      </section>
      <ConfirmationModal
        open={isOpenConfirmation}
        onOpenChange={setIsOpenConfirmation}
        onConfirm={handleSubmit}
        message={`Add ${selectedMembers.length} participant(s) to this room?`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default AddParticipantsForm;
