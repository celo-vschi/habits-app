const habitsReducerDefaultState = [];

export default (state = habitsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_HABITS':
            return action.habits;

        case 'ADD_HABIT':
            return [
                ...state,
                action.habit
            ];
        // case 'REMOVE_EXPENSE':
        //     return state.filter(({ id }) => id !== action.id);
        // case 'EDIT_EXPENSE':
        //     return state.map((expense) => {
        //         if (expense.id === action.id) {
        //             return {
        //                 ...expense,
        //                 ...action.updates
        //             }
        //         } else {
        //             return expense;
        //         }
        //     });

        default:
            return state;
    }
};