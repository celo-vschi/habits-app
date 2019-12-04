import database from '../firebase/firebase';

export const addHabit = (habit) => ({
    type: 'ADD_HABIT',
    habit
});

export const startAddHabit = (habitData = {}) => {
    console.log("X");
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            name = '',
        } = habitData;
        const habit = { name };
        return database.ref(`users/${uid}/habits`).push(habit)
            .then((ref) => {
                dispatch(addHabit({
                    id: ref.key,
                    ...habit
                }));
            })
            .catch(() => {

            });
    };
};


export const setHabits = (habits) => ({
    type: 'SET_HABITS',
    habits
});

export const startSetHabits = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/habits`).once('value')
            .then((snapshot) => {
                const habits = buildHabitsArray(snapshot);
                dispatch(setHabits(habits));
            });
    };
};

const buildHabitsArray = (snapshot) => {
    const habits = [];
    snapshot.forEach((childSnapshot) => {
        habits.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
    });
    return habits;
}
