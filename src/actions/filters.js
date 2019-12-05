import moment from 'moment';
export const setDate = (date) => ({
    type: 'SET_DATE',
    date
});

export const incrementDate = () => {
    return (dispatch, getState) => {
        const date = getState().filters.date;
        const incrementedDate = moment(date, "YYYY-MM-DD").add(1, 'days').format('YYYY-MM-DD');
        dispatch(setDate(incrementedDate));
    };
};

export const decrementDate = () => {
    return (dispatch, getState) => {
        const date = getState().filters.date;
        const decrementedDate = moment(date, "YYYY-MM-DD").subtract(1, 'days').format('YYYY-MM-DD');
        dispatch(setDate(decrementedDate));
    };
};