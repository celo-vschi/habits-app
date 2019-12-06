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
    const habitCount = habits.length;
    const today = moment();
    const green = [];
    const orange = [];
    const red = [];

    let checkingDay = moment().startOf('month');
    let worstDay = {
        date: null,
        no: habitCount
    };
    while (checkingDay.isBefore(today, 'day')) {
        const date = checkingDay.format('YYYY-MM-DD');
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

        checkingDay = checkingDay.add(1, 'days');
    }
    red.push(worstDay.date);

    const calendarData = {
        green, orange, red
    };
    // console.log(calendarData);
    return calendarData;
};

const habitsDone = (habits, date) => {
    let habitsDone = 0
    habits.forEach((habit) => {
        if (habit.progress && habit.progress[date] && habit.progress[date].done === true) {
            habitsDone++;
        }
    });
    // console.log(date, habitsDone);
    return habitsDone;
}

