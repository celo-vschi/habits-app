import moment from 'moment';

const PATTERN = 'YYYY-MM-DD';
const PRETTY_PATTERN = 'MMMM Do, YYYY';
const PRETTY_SHORT_PATTERN = 'MMM Do';

export const dateToPattern = (date) => (moment(date).format(PATTERN));
export const patternToDate = (pattern) => (moment(pattern).toDate());

export const getCurrentDate = () => (moment().format(PATTERN));

export const prettifyDate = (date) => (
    moment(date, PATTERN).format(PRETTY_PATTERN)
);
export const prettifyDateShort = (date) => (
    moment(date, PATTERN).format(PRETTY_SHORT_PATTERN)
);

const isSameMonthAndYear = (d1, d2) => (
    d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear()
)

export const getCalendarData = (habits) => {
    let green = [];
    let orange = [];
    let red = [];
    let special = [];
    let calendarData = {
        green, orange, red, special
    };

    let worst = {
        dates: [],
        percentage: 100
    };

    let checkingDay = moment().subtract(1, 'days');
    let habitsForDate = 0;
    do {
        let date = checkingDay.format(PATTERN);

        // special habits
        const specialHabitsForDate = specialHabitsForDay(habits, { date });
        if (specialHabitsForDate.length > 0) {
            const finishedHabits = habitsDone(specialHabitsForDate, date);
            if (finishedHabits != 0) {
                special.push(checkingDay.toDate());
            }
        }

        // normal habits
        habitsForDate = habitsForDay(habits, { date });
        if (habitsForDate.length > 0) {
            const allHabits = habitsForDate.length;

            const checkingDayDate = checkingDay.toDate();
            const finishedHabits = habitsDone(habitsForDate, date);
            if (finishedHabits === allHabits) {
                green.push(checkingDayDate);
            } else {
                const percentage = finishedHabits / allHabits;
                if (percentage == worst.percentage) {
                    worst.dates.push(checkingDayDate);
                } else if (percentage < worst.percentage) {

                    // move all worst.dates from the current month to orange
                    worst.dates = worst.dates.filter((date) => {
                        if (isSameMonthAndYear(date, checkingDayDate)) {
                            orange.push(date);
                        } else {
                            return date;
                        }
                    });
                    worst.dates.push(checkingDayDate);
                    worst.percentage = percentage;
                } else {
                    orange.push(checkingDayDate);
                }
            }
        }

        // if different month reset the worst.percentage
        const nextCheckingDay = moment(checkingDay).subtract(1, 'days');
        if (!checkingDay.isSame(nextCheckingDay, 'month')) {
            worst.percentage = 100;
        }
        checkingDay = nextCheckingDay;

    }
    while (habitsForDate.length > 0);

    // push all worst dates to red
    if (worst.dates.length > 0) {
        worst.dates.forEach((date) => red.push(date));
    }

    green = usePeriodsForCalendarData(calendarData.green);
    orange = usePeriodsForCalendarData(calendarData.orange);
    red = usePeriodsForCalendarData(calendarData.red);
    calendarData = { green, orange, red, special };
    return calendarData;
};

const usePeriodsForCalendarData = (array) => {
    const old = array.sort((d1, d2) => d1 - d2);

    const days = [];
    const periodStart = [];
    const periodMiddle = [];
    const periodEnd = [];

    let startFound = false;
    let lastDate = old[0];
    old.forEach((date, i) => {
        if (i != 0) {
            if (isNextDay(lastDate, date)) {
                if (startFound) {
                    periodMiddle.push(lastDate);
                } else {
                    periodStart.push(lastDate);
                    startFound = true;
                }
            } else {
                if (startFound) {
                    periodEnd.push(lastDate);
                    startFound = false;
                } else {
                    days.push(lastDate);
                }
            } if (i == old.length - 1) {
                if (isNextDay(lastDate, date)) {
                    periodEnd.push(date);
                } else {
                    days.push(date);
                }
            }
        }
        lastDate = date;
    });
    return { days, periodStart, periodMiddle, periodEnd };
}

const isNextDay = (d1, d2) => {
    return moment(d1).add(1, 'days').isSame(moment(d2));
}

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
    return habitsDone;
}

const habitDone = (habit, date) => (
    habit.progress && habit.progress[date] && habit.progress[date].done === true
);

export const getHabitProgress = (habitId, habits) => {
    let name;
    let currentStreak;
    let bestStreak;
    let total = 0;
    let completion;

    let days;

    habits.forEach((habit) => {
        if (habit.id === habitId) {
            name = habit.name;

            const startingDate = moment(habit.startingDate);
            let date = moment();
            days = date.diff(startingDate, 'days');
            let streak = getStreak(habits, habitId, moment(date));
            currentStreak = streak;
            bestStreak = streak;

            do {
                streak = getStreak(habits, habitId, date);

                if (streak > bestStreak) {
                    bestStreak = streak;
                }
                if (streak < 0) {
                    streak = Math.abs(streak);
                } else {
                    total += streak;
                }
            } while (!date.isSameOrBefore(startingDate));
        }
    });
    completion = (total / days * 100).toFixed();
    return {
        name,
        total,
        bestStreak,
        currentStreak,
        completion
    }
}

export const getStreakText = (habits, id) => {
    const now = moment();
    const streak = getStreak(habits, id, now);
    return getStreakFormattedText(streak);
}

const getStreak = (habits, id, date) => {
    let streak = 0;
    habits.forEach((habit) => {

        if (habit.id === id) {
            const startingDate = moment(habit.startingDate);
            let formattedDate = date.format(PATTERN);
            if (habitDone(habit, formattedDate)) {
                while (habitDone(habit, formattedDate) && startingDate.isSameOrBefore(date)) {
                    streak++;
                    date.subtract(1, 'days');
                    formattedDate = date.format(PATTERN);
                }
            } else {
                date.subtract(1, 'days');
                formattedDate = date.format(PATTERN);
                if (habitDone(habit, formattedDate)) {
                    while (habitDone(habit, formattedDate) && startingDate.isSameOrBefore(date)) {
                        streak++;
                        date.subtract(1, 'days');
                        formattedDate = date.format(PATTERN);
                    }
                } else {
                    while (!habitDone(habit, formattedDate) && startingDate.isSameOrBefore(date)) {
                        streak--;
                        date.subtract(1, 'days');
                        formattedDate = date.format(PATTERN);
                    }
                }
            }
        }
    });
    return streak;
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

export const habitsForDayAndFuture = (habits, { date }) => {
    const doneHabits = [];
    const notDoneHabits = [];
    habits.forEach((habit) => {
        if (habit.specialHabit) {
            return;
        }

        let done = false;
        if (habitIsStarted(habit, date)) {

            if (habit.progress && habit.progress[date]) {
                done = !!habit.progress[date].done;
            }

            if (done) {
                doneHabits.push({ ...habit, done });
            } else {
                notDoneHabits.push({ ...habit, done });
            }

        } else {
            notDoneHabits.push({ ...habit, done });
        }
    });
    return notDoneHabits.concat(doneHabits);
};

export const specialHabitsForDay = (habits, { date }) => {
    habits = orderHabits(habits);
    const doneHabits = [];
    const notDoneHabits = [];
    habits.forEach((habit) => {
        if (habit.specialHabit && habitIsStarted(habit, date)) {
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

export const habitsForDay = (habits, { date }) => {
    habits = orderHabits(habits);
    const doneHabits = [];
    const notDoneHabits = [];
    habits.forEach((habit) => {
        if (habit.specialHabit) {
            return;
        }

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

export const orderHabits = (habits) => {
    habits.sort((a, b) => {
        if (a.order === undefined) {
            return 1;
        } else if (b.order === undefined) {
            return -1;
        } else {
            return a.order - b.order;
        }
    });
    return habits;
}

export const checkHabits = (habits, fromDate, toDate) => {
    const map = new Map();

    let from = moment(fromDate);
    const to = moment(toDate);

    while (from.isSameOrBefore(to, 'day')) {
        const date = from.format(PATTERN);
        const habitsForDate = habitsForDay(habits, { date });
        if (habitsForDate.length > 0) {
            habitsForDate.forEach((habit) => {
                if (!habitDone(habit, date)) {
                    const name = habit.name;
                    if (map.has(name)) {
                        const newData = map.get(name) + 1;
                        map.set(name, newData);
                    } else {
                        map.set(name, 1);
                    }
                }
            });
        }
        from = from.add(1, 'days');
    }

    var orderedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    return orderedMap;
}