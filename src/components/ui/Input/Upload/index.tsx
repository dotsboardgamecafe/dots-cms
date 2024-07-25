'use client';
import { Eye, GalleryAdd, Trash } from 'iconsax-react';
import Image from 'next/image';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import { upload } from '@/lib/api/upload';
import { cn } from '@/lib/utils';

import ImageViewer from '@/components/ui/ImageViewer';
import Typography from '@/components/ui/Typography';

type Variants = 'default' | 'small';

type Props = {
  onChange: (value: string) => void;
  variant?: Variants;
  value?: string;
  multiple?: boolean;
  id?: string,
  description?: string,
};

const Upload = ({ onChange, variant = 'default', value, multiple = false, id, description }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [imageViewerOpen, setImageViewerOpen] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {

    if (value) {
      setPreview(value);
      return;
    }

    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, value]);

  const onClickWrapper = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    if (ref.current) {
      ref.current.click();
    }
  };

  const onImageChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files || evt.target.files.length === 0) {
      return;
    }
    // setSelectedFile( evt.target.files[ 0 ] );
    await uploadImage(evt.target.files[0]);
  };

  const onRemoveImage = () => {
    setSelectedFile(undefined);
    setPreview(undefined);
  };

  const uploadImage = async (image: File) => {
    const res = await upload(image);
    onChange(res.data as string);
    setSelectedFile(image);
  };

  const renderImageList = () => {
    return <>
      {

      }

    </>;
  };

  return (
    <>
      <div className={cn(`upload-wrapper--${variant}`)} onClick={(e) => onClickWrapper(e)}>
        {
          !preview && variant === 'default' && <>
            <div className='upload-icon'>
              <GalleryAdd className='text-white' size={24} />
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
              <GalleryAdd size={24} />
            </div>

          </>
        }
        {preview && (
          <div className='w-full h-[240px] relative flex items-center justify-center group'>
            <Image
              src={preview}
              fill
              alt="banner-preview"
              style={{ objectFit: 'contain' }}
            />
            <div onClick={(evt) => { evt.stopPropagation(); }} className='absolute  rounded-xl bg-black bg-opacity-60 hidden group-hover:flex items-center justify-center gap-2' style={{ width: '100%', height: '100%' }}>
              <Eye className='text-white' size={26} onClick={() => setImageViewerOpen(true)} />
              <Trash className='text-white' size={26} onClick={() => onRemoveImage()} />
            </div>

          </div>
        )}

        <input id={id} type="file" accept="image/*" ref={ref} className='hidden' onChange={onImageChange} />
      </div>
      {description && (
        <Typography variant='text-body-m-regular' className='text-gray-500'>
          {description}
        </Typography>
      )}
      {
        multiple && renderImageList()
      }
      <ImageViewer src={preview} visible={imageViewerOpen} onClose={() => setImageViewerOpen(false)} />
    </>
  );
};


export default Upload;