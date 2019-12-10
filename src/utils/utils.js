import moment from 'moment';

const PATTERN = 'YYYY-MM-DD';
const PRETTY_PATTERN = 'MMMM Do, YYYY';

export const getCurrentDate = () => (
    moment().format(PATTERN)
);

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

    const habitCount = habits.length;
    const today = moment();

    let checkingDay = moment().startOf('month');
    let worstDay = {
        date: null,
        no: habitCount
    };

    let startedTrackingHabits = false;
    while (checkingDay.isBefore(today, 'day')) {
        const date = checkingDay.format(PATTERN);

        if (startedTrackingHabits || userStartedTrakingHabits(habits, date)) {
            startedTrackingHabits = true;

            const checkingDayDate = checkingDay.toDate();
            const habitsFinished = habitsDone(habits, date);


            if (habitsFinished === habitCount) {
                green.push(checkingDayDate);

            } else if (habitsFinished <= worstDay.no) {
                if (worstDay.date !== null) {
                    orange.push(worstDay.date);
                }
                worstDay.date = checkingDayDate;
                worstDay.no = habitsFinished;

            } else {
                orange.push(checkingDayDate);
            }

        }
        checkingDay = checkingDay.add(1, 'days');
    }
    if (startedTrackingHabits && worstDay.date) {
        red.push(worstDay.date);
    }

    // console.log(calendarData);
    return calendarData;
};

export const getDailySummary = (habits, date) => {
    const all = habits.length;
    const finished = habitsDone(habits, date);
    return `${finished}/${all}`;
}

const userStartedTrakingHabits = (habits, date) => {
    let alreadyTrekking = false;
    habits.forEach((habit) => {
        if (habit.progress && habit.progress[date] && habit.progress[date].done === true) {
            alreadyTrekking = true;
        }
    });
    // console.log(date, alreadyTrekking);
    return alreadyTrekking;
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
            let now = moment();
            let date = now.format(PATTERN);
            if (habitDone(habit, date)) {
                while (habitDone(habit, date)) {
                    streak++;
                    now.subtract(1, 'days');
                    date = now.format(PATTERN);
                }
            } else {
                now.subtract(1, 'days');
                date = now.format(PATTERN);
                if (habitDone(habit, date)) {
                    while (habitDone(habit, date)) {
                        streak++;
                        now.subtract(1, 'days');
                        date = now.format(PATTERN);
                    }
                } else {
                    while (!habitDone(habit, date)) {
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

const getStreakFormattedText = (streak) => {
    const word = streak > 0 ? 'streak' : 'miss';
    const day = streak === 1 || streak === -1 ? 'day' : 'days';
    streak = streak < 0 ? -streak : streak;
    return `${streak} ${day} ${word}`;
}