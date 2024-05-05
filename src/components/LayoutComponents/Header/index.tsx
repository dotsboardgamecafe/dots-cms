import React, { PropsWithChildren, PropsWithRef } from 'react';

import Notification from '@/components/LayoutComponents/Header/notification';
import Profile from '@/components/LayoutComponents/Header/profile';
import ProfileMenu from '@/components/LayoutComponents/Header/profileMenu';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/Breadcrumb';
import Typography from '@/components/ui/Typography';

type Props = PropsWithRef<PropsWithChildren<{
  title: string;
  subtitle?: {
    label: string;
    link?: string;
  }[];
  breadCrumbs?: React.ReactNode;
}>>;

const Header = ( { title, subtitle }: Props ) => {

  const breadcrumbs = () => {

    return (
      <>
        <Breadcrumb>
          <BreadcrumbList>
            { subtitle?.map( ( { label, link }, index ) => {
              const lastItem = subtitle?.length - 1 === index;
              return (
                <React.Fragment key={ index }>
                  <BreadcrumbItem key={ index }>
                    <BreadcrumbLink href={ link }>
                      <Typography variant={ lastItem && subtitle?.length > 1 ? 'paragraph-l-medium' : 'paragraph-l-regular' } color='neutral-ink'>
                        { label }
                      </Typography>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  { !lastItem && <BreadcrumbSeparator /> }
                </React.Fragment>
              );
            } ) }
          </BreadcrumbList>
        </Breadcrumb>
      </>
    );
  };

  return (
    <section className='flex'>
      <div className='flex flex-col'>
        <Typography variant='heading-h4' color='neutral-ink'>
          { title }
        </Typography>
        { breadcrumbs() }
      </div>
      <div className='flex flex-1 justify-end items-center gap-6'>
        <Notification />
        <Profile />
        <ProfileMenu />
      </div>
    </section>
  );
};

export default Header;