import moment from 'moment';

const PATTERN = 'YYYY-MM-DD';
const PRETTY_PATTERN = 'MMMM Do, YYYY';

export const getCurrentDate = () => (
    moment().format(PATTERN)
);

export const prettifyDate = (date) => (
    moment(date, PATTERN).format(PRETTY_PATTERN)
);