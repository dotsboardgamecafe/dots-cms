'use client';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import Typography from '@/components/ui/Typography';

import SidebarMenus from '@/config/menus';
import usePermissions from '@/helper/hooks/usePermissions';


const Menus = () => {
  const [activeMenuGroup, setActiveMenuGroup] = useState<string>('')
  const pathName = usePathname();
  const permissions = usePermissions();

  useEffect(() => {
    setActiveMenuGroup('')
  }, [pathName])

  const hasPermission = (permission: string) => {
    return permissions?.some((item) => item.includes(permission));
  };
  return (
    <ul className='sidebar-menu-container'>
      {SidebarMenus.map((menu, index) => {
        if (!hasPermission(menu.permissions) && menu.permissions !== 'menu-group') return null;
        const hasChild = !!(menu.child && menu.child.length > 0)
        const isChildActive = hasChild && menu.child?.some((childMenu) => pathName.includes(childMenu.href))
        const isActive = hasChild ? activeMenuGroup === menu.title : pathName.includes(menu.href);
        return (
          <li className={cn(['sidebar-menu-item', (isActive && !hasChild) && 'active'])} key={`sidebar-items-${index}`}>
            <Link href={menu.href} onClick={(event) => {
              if (!hasChild) return
              event.preventDefault()
              setActiveMenuGroup((prevActiveMenu) => prevActiveMenu === menu.title ? '' : menu.title)
            }}>
              {menu.icon((isActive || isChildActive))}
              <span className='flex flex-row flex-nowrap justify-between'>
                <Typography variant={
                  (isActive || isChildActive)
                    ? 'paragraph-xl-bold'
                    : 'paragraph-xl-regular'
                }>
                  {menu.title}
                </Typography>
                {(hasChild && (!isActive && !isChildActive)) && <ArrowDown2 variant='Broken' />}
                {(hasChild && (isActive || isChildActive)) && <ArrowUp2 variant='Broken' />}
              </span>
            </Link>
            {(hasChild && (isActive || isChildActive)) && (
              <ul className='sidebar-menu-container'>
                {menu.child?.map((childMenu, childIndex) => {
                  if (!hasPermission(childMenu.permissions) && childMenu.permissions !== 'menu-group') return null;
                  const isActive = pathName.includes(childMenu.href);
                  return (
                    <li className={cn(['sidebar-menu-item', isActive && 'active'])} key={`sidebar-child-${menu.permissions}-${childIndex}`}>
                      <Link href={childMenu.href}>
                        {childMenu.icon(isActive)}
                        <Typography variant={
                          isActive
                            ? 'paragraph-xl-bold'
                            : 'paragraph-xl-regular'
                        }>
                          {childMenu.title}
                        </Typography>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};


export default Menus;