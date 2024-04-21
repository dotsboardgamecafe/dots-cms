import fetcher from '@/lib/api/utils/fetcher';

export const upload = async ( file: File ) => {
  const formData = new FormData();
  formData.append( 'files', file );
  return await fetcher( 'upload', { body: formData, isUpload: true } );
};