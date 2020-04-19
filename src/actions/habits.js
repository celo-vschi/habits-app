import database from '../firebase/firebase';
import * as utils from '../utils/utils';

export const addHabit = (habit) => ({
    type: 'ADD_HABIT',
    habit
});

export const startAddHabit = (habitData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        const {
            name = '',
            startingDate = utils.getCurrentDate(),
            specialHabit = false
        } = habitData;

        const habit = { name, startingDate, specialHabit };
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

export const editHabit = (id, updates) => ({
    type: 'EDIT_HABIT',
    id,
    updates
});

export const startEditHabit = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/habits/${id}`).update(updates)
            .then(() => {
                dispatch(editHabit(id, updates));
            });
    };
};

export const removeHabit = ({ id } = {}) => ({
    type: 'REMOVE_HABIT',
    id
});

export const startRemoveHabit = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/habits/${id}`).remove()
            .then(() => {
                dispatch(removeHabit({ id }));
            });
    };
};

export const markProgress = (id, progress) => ({
    type: 'MARK_PROGRESS',
    id,
    progress
})

export const startMarkHabit = ({ id, date, done } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/habits/${id}/progress/${date}`).set({ done })
            .then(() => {
                const progressUpdate = {
                    [date]: { done }
                };
                dispatch(markProgress(id, progressUpdate));
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
