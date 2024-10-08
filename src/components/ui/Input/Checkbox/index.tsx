import { PropsWithChildren, PropsWithRef } from 'react';

import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<PropsWithChildren<
  {
    label: string;
  } & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>>;

const Checkbox = ({ label, className, value, type, id, ...props }: Props) => {

  return (
    <>
      <div className="flex items-center gap-3">
        <input id={id || 'default-checkbox'} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...props} />
        <label htmlFor={id || 'default-checkbox'}>
          <Typography variant='text-body-l-medium' >{label}</Typography>
        </label>
      </div>
    </>
  );
};

export default Checkbox;