import dayjs from 'dayjs';
import dayjsFormats from 'dayjs/plugin/advancedFormat';

dayjs.extend(dayjsFormats);

export const formatRoomSchedule = (start_date: string, end_date: string, start_time: string, end_time: string) => {
  return `${dayjs(start_date).format('ddd, DD MMM YYYY')} ${formatTimeHourMinutes(start_time)} - ${formatTimeHourMinutes(end_time)}`;
};

export const formatTournamentDate = (start_date: string, end_date: string): string => {
  const isTheSameDate = dayjs(start_date).isSame(dayjs(end_date), 'date')
  const isTheSameMonth = dayjs(start_date).isSame(end_date, 'month')
  const isTheSameYear = dayjs(start_date).isSame(end_date, 'year')
  const isStartInCurrentYear = dayjs(start_date).isSame(new Date(), 'year')
  const isEndInCurrentYear = dayjs(end_date).isSame(new Date(), 'year')
  let formatEndDate = 'Do'
  let formatStartDate = 'MMM, Do'

  if (!isTheSameMonth) formatEndDate = 'MMM, Do'
  if (!isEndInCurrentYear) formatEndDate += ' YYYY'
  if (!isTheSameYear && (!isEndInCurrentYear || !isStartInCurrentYear)) formatStartDate += ' YYYY'

  if (isTheSameDate) return dayjs(start_date).format(formatStartDate)
  return `${dayjs(start_date).format(formatStartDate)} - ${dayjs(end_date).format(formatEndDate)}`;
};

export const formatDate = (date: string) => {
  return dayjs(date).format('MMM Do, YYYY');
};

export function formatTimeHourMinutes(time: string): string {
  const splitTime: string[] = time.split(':')
  const [hour, minute] = splitTime

  if (!hour && !minute) return 'Invalid Time'

  return `${hour}:${minute}`
}

export function checkIsPastDate(date: dayjs.Dayjs): boolean {
  return dayjs(date).isBefore(dayjs())
}