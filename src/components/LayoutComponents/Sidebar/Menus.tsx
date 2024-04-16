'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import Typography from '@/components/ui/Typography';

import SidebarMenus from '@/config/menus';


const Menus = () => {
  const pathName = usePathname();
  return (
    <ul className='sidebar-menu-container'>
      { SidebarMenus.map( ( menu, index ) => {
        const isActive = pathName === menu.href;
        return (
          <li className={ cn( [ 'sidebar-menu-item', isActive && 'active' ] ) } key={ `sidebar-items-${index}` }>
            <Link href={ menu.href }>
              { menu.icon( isActive ) }
              <Typography variant={
                isActive
                  ? 'paragraph-xl-bold'
                  : 'paragraph-xl-regular'
              }>
                { menu.title }
              </Typography>
            </Link>
          </li>
        );
      } ) }
    </ul>
  );
};


export default Menus;