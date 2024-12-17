import Image from 'next/image';
import { PropsWithRef, useEffect } from 'react';

import { useGameQr } from '@/lib/api/games/hooks';

import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { Separator } from '@/components/ui/Separator';
import Skeleton from '@/components/ui/Skeleton';



type Props = PropsWithRef<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gameTitle: string;
  gameId: string;
}>;

const ShowQrModal = ({ open, onOpenChange, gameTitle, gameId }: Props) => {
  const { isLoading, data, run } = useGameQr(gameId)

  useEffect(() => {
    if (!open) return
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, open])

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent hideCloseIcon className='max-w-3xl max-h-[90%] overflow-hidden flex flex-col'>
        <ModalHeader className='h-fit'>
          <ModalTitle>
            {gameTitle} - QR Codes
          </ModalTitle>
        </ModalHeader>
        <Separator />
        <section className='flex items-center justify-center p-8'>
          {!data && isLoading && (
            <Skeleton className="w-[360px] h-[360px]" />
          )}
          {(data && !isLoading && (
            <div className='flex flex-col gap-3 items-center'>
              <Image alt={`${gameId}-qr-code`} src={data} width="360" height="360" />
              <a className='py-2 px-6 border-2 hover:bg-slate-200' href={data} download={`[${gameId}] ${gameTitle} QR Code.jpeg`}>Download QR Code</a>
            </div>
          ))}
        </section>
      </ModalContent>
    </Modal>
  );
};

export default ShowQrModal;