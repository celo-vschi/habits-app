export default (habits, { date }) => {
    const doneHabits = [];
    const notDoneHabits = [];
    habits.forEach((habit) => {
        let done = false;
        if (habit.progress && habit.progress[date]) {
            done = !!habit.progress[date].done;
        }

        if (done) {
            doneHabits.push({ ...habit, done });
        } else {
            notDoneHabits.push({ ...habit, done });
        }

    });
    return notDoneHabits.concat(doneHabits);
};