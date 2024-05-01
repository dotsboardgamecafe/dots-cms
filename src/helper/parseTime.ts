export const parseTime = ( time: string ) => {
  const [ hour, minutes ] = time.split( ':' );
  return {
    hour: +hour,
    minutes: +minutes
  } as { hour: number, minutes: number; };
};