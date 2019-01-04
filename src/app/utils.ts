import { format } from 'date-fns';


export function formatDate(date) {
  return date ? format(date, 'YYYY-MM-DD HH:mm:ss') : '';
}
