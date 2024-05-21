'use client';
import { CloudPlus, Eye, GalleryAdd, Trash } from 'iconsax-react';
import Image from 'next/image';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import { upload } from '@/lib/api/upload';
import { cn } from '@/lib/utils';

import ImageViewer from '@/components/ui/ImageViewer';
import Typography from '@/components/ui/Typography';

type Variants = 'default' | 'small';

type Props = {
  onChange: ( value: string[] ) => void;
  variant?: Variants;
  value: string[];

};

const MultiUpload = ( { onChange, variant = 'default', value }: Props ) => {
  const [ selectedFile, setSelectedFile ] = useState<File>();
  const [ images, setImages ] = useState<File[]>( [] );
  const [ preview, setPreview ] = useState<string>();
  const [ imageViewerOpen, setImageViewerOpen ] = useState<boolean>( false );
  const ref = useRef<HTMLInputElement>( null );

  useEffect( () => {

    if ( value ) {
      setPreview( value[ 0 ] );
      return;
    }

    if ( !selectedFile ) {
      setPreview( undefined );
      return;
    }

    const objectUrl = URL.createObjectURL( selectedFile );
    setPreview( objectUrl );

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL( objectUrl );
  }, [ selectedFile, value ] );

  const onOpenFileBrowser = ( evt: MouseEvent<HTMLDivElement> ) => {
    evt.stopPropagation();
    if ( ref.current ) {
      ref.current.click();
    }
  };

  const onImageChange = async ( evt: ChangeEvent<HTMLInputElement> ) => {
    if ( !evt.target.files || evt.target.files.length === 0 ) {
      return;
    }
    const file = evt.target.files[ 0 ];
    setImages( ( prev ) => [ ...prev, file ] );
    await uploadImage( file );
  };

  const uploadImage = async ( image: File ) => {
    const res = await upload( image );
    onChange( [ ...value, res.data as string ] );
    setSelectedFile( image );
  };
  const renderImageList = () => {
    return <>
      <div className='flex flex-row gap-4'>
        {
          value.map( ( image, index ) => (
            <div
              key={ index }
              className={ cn( [
                'w-[92px] h-[92px] relative flex rounded-xl bg-gray-200 cursor-pointer hover:border-2 hover:border-brand-blue-electric group',
                {
                  'border-2 border-brand-blue-electric': image === preview
                }
              ] ) }
              onClick={ () => setPreview( image ) }
            >
              <Image
                src={ image }
                fill
                alt="banner-preview"
                style={ { objectFit: 'cover' } }
                className='rounded-xl'
              />
              <div className='absolute rounded-xl bg-black bg-opacity-60 hidden group-hover:flex items-center justify-center gap-2' style={ { width: '100%', height: '100%' } }>
                <Trash className='text-white' size={ 24 } onClick={ () => onChange( value.filter( ( _, i ) => i !== index ) ) } />
              </div>
            </div>
          ) )
        }
        <div
          className='w-[92px] h-[92px] flex rounded-xl justify-center items-center bg-gray-200 cursor-pointer hover:border-2 hover:border-brand-blue-electric group'
          onClick={ onOpenFileBrowser }
        >
          <CloudPlus />
        </div>
      </div>

    </>;
  };

  return (
    <>
      <div className={ cn( `upload-wrapper--${variant}` ) } onClick={ ( e ) => onOpenFileBrowser( e ) }>
        {
          !preview && variant === 'default' && <>
            <div className='upload-icon'>
              <GalleryAdd className='text-white' size={ 24 } />
            </div>
            <Typography variant='text-body-l-regular'>
              Drag & Drop or choose file to upload
            </Typography>
            <Typography variant='text-body-m-regular' className='text-gray-500'>
              JPG or PNG max 800KB
            </Typography>
          </>
        }
        {
          !preview && variant === 'small' && <>
            <div className='upload-icon--small'>
              <GalleryAdd size={ 24 } />
            </div>

          </>
        }
        { preview && (
          <div className='w-full h-[240px] relative flex items-center justify-center group'>
            <Image
              src={ preview }
              fill
              alt="banner-preview"
              style={ { objectFit: 'contain' } }
            />
            <div onClick={ ( evt ) => { evt.stopPropagation(); } } className='absolute  rounded-xl bg-black bg-opacity-60 hidden group-hover:flex items-center justify-center gap-2' style={ { width: '100%', height: '100%' } }>
              <Eye className='text-white' size={ 26 } onClick={ () => setImageViewerOpen( true ) } />
            </div>
          </div>
        ) }

        <input type="file" accept="image/*" ref={ ref } className='hidden' onChange={ onImageChange } />
      </div>
      {
        renderImageList()
      }
      <ImageViewer src={ preview } visible={ imageViewerOpen } onClose={ () => setImageViewerOpen( false ) } />
    </>
  );
};


export default MultiUpload;