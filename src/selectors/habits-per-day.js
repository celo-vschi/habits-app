export default (habits, { date }) => {
    const selectedHabits = [];
    habits.forEach((habit) => {
        let done = false;
        if (habit.progress && habit.progress[date]) {
            done = !!habit.progress[date].done;
        }
        selectedHabits.push({ ...habit, done });
    });
    return selectedHabits;
};