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
        case 'REMOVE_HABIT':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_HABIT':
            return state.map((habit) => {
                if (habit.id === action.id) {
                    return {
                        ...habit,
                        ...action.updates
                    }
                } else {
                    return habit;
                }
            });
        default:
            return state;
    }
};