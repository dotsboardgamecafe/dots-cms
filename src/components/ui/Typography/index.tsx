import { PropsWithChildren, PropsWithRef } from 'react';

import { cn } from '@/lib/utils';

import { variantsMapping } from '@/components/ui/Typography/variants';




type Props = PropsWithRef<
  PropsWithChildren<{
    color?:
    | 'brand-yellow'
    | 'brand-red'
    | 'brand-blue-electric'
    | 'brand-neon-color'
    | 'midnight-black'
    | 'hover'
    | 'neutral-ink'
    | 'neutral-smoke-white'
    | 'accent-soft-blue';
    variant: keyof typeof variantsMapping;
    weight?: 'regular' | 'bold';
    className?: string;
  }>
>;


const Typography = ( {
  variant,
  color,
  children,
  className,
  ...props
}: Props ) => {
  const Component = variant ? variantsMapping[ variant ] : 'p';
  const colorClass = color ? `typography--color-${color}` : '';
  return (
    <Component
      className={ cn( [
        {
          [ `typography--variant-${variant}` ]: variant,
        },
        colorClass,
        className,
      ] ) }
      { ...props }
    >
      { children }
    </Component>
  );
};

export default Typography;
