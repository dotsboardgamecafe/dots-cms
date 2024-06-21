import Image from 'next/image';

import { Separator } from '@/components/ui/Separator';
import Typography from '@/components/ui/Typography';

import { formatDate } from '@/helper/datetime';

import { RewardType } from '@/types/rewards';


const RewardView = ({ data, onEdit }: { data: RewardType | null; onEdit: () => void; }) => {

  return (
    <>
      <div className='gap-6 flex flex-col flex-grow overflow-y-auto'>
        <section className='flex flex-row items-center gap-3'>
          <Image src={data?.image_url || '/images/avatar-not-found.png'} alt="member-detail-avatar" width={440} height={170} className='rounded-xl' />
        </section>
        <section className='flex flex-col  gap-1'>
          <Typography variant='paragraph-l-regular'>
            Voucher Category
          </Typography>
          <Typography variant='paragraph-xl-regular'>
            {data?.category_type || '-'}
          </Typography>
          <Separator className='mt-1' />
        </section>
        <section className='flex flex-col  gap-1'>
          <Typography variant='paragraph-l-regular'>
            Tier
          </Typography>
          <Typography variant='paragraph-xl-regular'>
            {data?.Tier.name || '-'}
          </Typography>
          <Separator className='mt-1' />
        </section>
        <section className='flex flex-col  gap-1'>
          <Typography variant='paragraph-l-regular'>
            Expired Date
          </Typography>
          <Typography variant='paragraph-xl-regular' className='capitalize'>
            {formatDate(data?.expired_date || '2000-00-00')}
          </Typography>
          <Separator className='mt-1' />
        </section>
        <section className='flex flex-col  gap-1'>
          <button onClick={onEdit} className='flex flex-col'>
            <Typography variant='paragraph-l-regular' className='text-brand-blue-electric cursor-pointer'>
              Click here to edit
            </Typography>
          </button>
        </section>
      </div>
    </>
  );
};

export default RewardView;