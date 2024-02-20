import { PropsWithChildren, PropsWithRef } from 'react';

import { cn } from '@/lib/utils';


const variantsMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subheading1: 'h6',
  subheading2: 'h6',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  small: 'p',
} as const;

type Props = PropsWithRef<
  PropsWithChildren<{
    color?:
    | 'high-emphasis'
    | 'low-emphasis'
    | 'disabled'
    | 'on-activity'
    | 'alert'
    | 'positive'
    | 'invert'
    | string;
    variant: keyof typeof variantsMapping;
    weight?: 'regular' | 'bold';
    className?: string;
  }>
>;

const Typography = ( {
  variant,
  color,
  children,
  weight,
  className,
  ...props
}: Props ) => {
  const Component = variant ? variantsMapping[ variant ] : 'p';

  return (
    <Component
      className={ cn( [
        {
          [ `typography--variant-${variant}` ]: variant,
          [ `typography--color-${color}` ]: color,
          [ `typography--weight-${weight}` ]: weight,
        },
        className,
      ] ) }
      { ...props }
    >
      { children }
    </Component>
  );
};

export default Typography;
