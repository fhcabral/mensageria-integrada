import * as moment from 'moment';

export const formatDate = (date: string | Date) => {
  return moment(date).format('DD/MM/YYYY');
};
