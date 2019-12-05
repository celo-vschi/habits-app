import moment from 'moment';

export const getCurrentDate = () => (
    moment().format('YYYY-MM-DD')
);