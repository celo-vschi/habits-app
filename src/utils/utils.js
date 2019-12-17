import moment from 'moment';

const PATTERN = 'YYYY-MM-DD';
const PRETTY_PATTERN = 'MMMM Do, YYYY';

export const dateToPattern = (date) => (moment(date).format(PATTERN));
export const patternToDate = (pattern) => (moment(pattern).toDate());

export const getCurrentDate = () => (moment().format(PATTERN));

export const prettifyDate = (date) => (
    moment(date, PATTERN).format(PRETTY_PATTERN)
);

export const getCalendarData = (habits) => {
    const green = [];
    const orange = [];
    const red = [];
    const calendarData = {
        green, orange, red
    };

    const today = moment();
    let checkingDay = moment().startOf('month');
    let worst = {
        dates: [],
        percentage: 100
    };

    while (checkingDay.isBefore(today, 'day')) {
        const date = checkingDay.format(PATTERN);
        const habitsForDate = habitsForDay(habits, { date });
        if (habitsForDate.length > 0) {
            const allHabits = habitsForDate.length;

            const checkingDayDate = checkingDay.toDate();
            const finishedHabits = habitsDone(habits, date);

            if (finishedHabits === allHabits) {
                green.push(checkingDayDate);

            } else {
                const percentage = finishedHabits / allHabits;

                if (percentage == worst.percentage) {
                    worst.dates.push(checkingDayDate);
                } else if (percentage < worst.percentage) {
                    worst.dates.forEach((date) => orange.push(date));
                    worst.dates = [checkingDayDate];
                    worst.percentage = percentage;

                } else {
                    orange.push(checkingDayDate);
                }
            }
        }
        checkingDay = checkingDay.add(1, 'days');
    }
    if (worst.dates.length > 0) {
        worst.dates.forEach((date) => red.push(date));
    }

    // console.log(calendarData);
    return calendarData;
};

export const getDailySummary = (habits, date) => {
    const habitsForDate = habitsForDay(habits, { date });
    const finished = habitsDone(habitsForDate, date);
    return `${finished}/${habitsForDate.length}`;
}

const habitsDone = (habits, date) => {
    let habitsDone = 0
    habits.forEach((habit) => {
        if (habitDone(habit, date)) {
            habitsDone++;
        }
    });
    // console.log(date, habitsDone);
    return habitsDone;
}

const habitDone = (habit, date) => (
    habit.progress && habit.progress[date] && habit.progress[date].done === true
);

export const getStreakText = (habits, id) => {
    let streak = 0;
    habits.forEach((habit) => {

        if (habit.id === id) {
            const startingDate = moment(habit.startingDate);
            let now = moment();
            let date = now.format(PATTERN);
            if (habitDone(habit, date)) {
                while (habitDone(habit, date) && startingDate.isSameOrBefore(now)) {
                    streak++;
                    now.subtract(1, 'days');
                    date = now.format(PATTERN);
                }
            } else {
                now.subtract(1, 'days');
                date = now.format(PATTERN);
                if (habitDone(habit, date)) {
                    while (habitDone(habit, date) && startingDate.isSameOrBefore(now)) {
                        streak++;
                        now.subtract(1, 'days');
                        date = now.format(PATTERN);
                    }
                } else {
                    while (!habitDone(habit, date) && startingDate.isSameOrBefore(now)) {
                        streak--;
                        now.subtract(1, 'days');
                        date = now.format(PATTERN);
                    }
                }
            }
        }
    });
    return getStreakFormattedText(streak);
}

const habitStarted = (habit) => {
    return habit.progress !== undefined;
};

const getStreakFormattedText = (streak) => {
    const word = streak > 0 ? 'streak' : 'miss';
    const day = streak === 1 || streak === -1 ? 'day' : 'days';
    streak = streak < 0 ? -streak : streak;
    return `${streak} ${day} ${word}`;
};

export const habitsForDay = (habits, { date }) => {
    const doneHabits = [];
    const notDoneHabits = [];
    habits.forEach((habit) => {

        if (habitIsStarted(habit, date)) {

            let done = false;
            if (habit.progress && habit.progress[date]) {
                done = !!habit.progress[date].done;
            }

            if (done) {
                doneHabits.push({ ...habit, done });
            } else {
                notDoneHabits.push({ ...habit, done });
            }
        }
    });
    return notDoneHabits.concat(doneHabits);
};

const habitIsStarted = (habit, date) => {
    const momentStartingDate = moment(habit.startingDate);
    const momentDate = moment(date);
    return momentStartingDate.isSameOrBefore(momentDate);
}