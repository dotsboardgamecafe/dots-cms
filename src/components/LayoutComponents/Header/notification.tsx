import { Notification as NotificationIcon } from 'iconsax-react';

// type Props = PropsWithRef<PropsWithChildren>;

const Notification = () => {

  return (
    <div className='flex items-center p-3 rounded-xl bg-gray-100'>
      <NotificationIcon />
    </div>
  );
};

export default Notification;