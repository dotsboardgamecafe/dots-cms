'use client';
import { CloseCircle } from 'iconsax-react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

type Props = {
  visible: boolean,
  src?: string | StaticImport;
  onClose: () => void;
};

const ImageViewer = ( { visible = false, src, onClose }: Props ) => {

  const [ isClient, setIsClient ] = useState( false );
  const [ zoom, setZoom ] = useState( 1 );

  useEffect( () => {
    setIsClient( true );
  }, [] );

  const clamp = ( num: number, min: number, max: number ) => Math.min( Math.max( num, min ), max );

  const onImageScroll = ( evt: React.WheelEvent<HTMLElement> ) => {
    setZoom( clamp( zoom - ( evt.deltaY * 0.005 ), 0.2, 2 ) );
  };

  const Component = (
    <section className={
      cn( [
        {
          'hidden': !visible,
          'flex': visible
        },
        'image-viewer',
      ] )
    }>
      <div
        className={ cn(
          'fixed top-0 left-0 z-30 w-full h-full bg-black bg-opacity-50',
          {
            'hidden': !visible,
            'block': visible,
          }
        ) }
        onClick={ onClose }
      />
      <div className='image-viewer-close'>
        <CloseCircle size={ 32 } onClick={ onClose } />
      </div>

      <section className='image-viewport' onWheelCapture={ onImageScroll }>
        <Image
          src={ src || '/images/broken-image.png' }
          alt='og'
          width={ 0 }
          height={ 0 }
          sizes='100vw'
          className={
            cn( [
              'w-full h-full object-cover transition duration-300 ease-in-out',
            ] )
          }
          style={ {
            transform: `scale(${zoom})`,
          } }
        />
      </section>
    </section>
  );

  return isClient ? createPortal( Component, document.getElementById( 'portal' ) || document.body ) : null;
};

export default ImageViewer;