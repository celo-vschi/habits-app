import * as utils from '../utils/utils';

const filtersReducerDefaultState = {
    date: utils.getCurrentDate(),
    checkStartDate: undefined,
    checkEndDate: undefined
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_DATE':
            return {
                ...state,
                date: action.date
            }
        case 'SET_CHECK_START_DATE':
            return {
                ...state,
                checkStartDate: action.date
            }
        case 'SET_CHECK_END_DATE':
            return {
                ...state,
                checkEndDate: action.date
            }
        default:
            return state;
    }
};