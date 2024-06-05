import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';

dayjs.extend( dayjsFormats );

export const formatRoomSchedule = ( start_date: string, end_date: string ) => {
  return `${dayjs( start_date ).format( 'ddd Do, HH:mm' )} - ${dayjs( end_date ).format( 'HH:mm' )}`;
};

export const formatTournamentDate = ( start_date: string, end_date: string ) => {
  return `${dayjs( start_date ).format( 'MMM, Do' )} - ${dayjs( end_date ).format( 'Do' )}`;
};

export const formatDate = ( date: string ) => {
  return dayjs( date ).format( 'MMM Do, YYYY' );
};