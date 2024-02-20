import Link from 'next/link';
import { PropsWithChildren, PropsWithRef } from 'react';

import Typography from '@/components/ui/Typography';

type NavbarItem = {
  label: string;
  href: string;
};

type Props = PropsWithRef<PropsWithChildren<NavbarItem>>;

const NavbarItem = ( { href, label }: Props ) => {

  return (
    <>
      <Link href={ href }>
        <Typography variant='body1'>
          { label }
        </Typography>
      </Link>
    </>
  );
};

export default NavbarItem;