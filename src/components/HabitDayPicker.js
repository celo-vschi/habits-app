import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';
import { setDate } from '../actions/filters';
import { FaCircle } from "react-icons/fa";
import * as utils from '../utils/utils';

export class HabitDayPicker extends React.Component {
    handleDayClick = (day) => {
        const date = moment(day).format('YYYY-MM-DD');
        this.props.setDate(date);
    };

    isSpecial = (date) => {
        const specialDates = this.props.calendarData.special;
        var special = false;
        for (var i = 0; i < specialDates.length; i++) {
            if (this.isSameDay(specialDates[i], date)) {
                special = true;
                break;
            }
        }
        return special;
    }

    isSameDay = (d1, d2) => (
        d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear()
    )


    renderDay = (day) => {
        const date = day.getDate();
        return (
            <div className="normalDay">
                <div>{date}</div>
                {this.isSpecial(day) &&
                    <div className="specialDay">
                        <FaCircle />
                    </div>
                }
            </div >
        );
    }

    render() {
        const { green, orange, red } = {
            green: this.props.calendarData.green,
            orange: this.props.calendarData.orange,
            red: this.props.calendarData.red
        }
        return (
            <DayPicker
                modifiers={{
                    green: green.days,
                    greenStart: green.periodStart,
                    greenMiddle: green.periodMiddle,
                    greenEnd: green.periodEnd,

                    orange: orange.days,
                    orangeStart: orange.periodStart,
                    orangeMiddle: orange.periodMiddle,
                    orangeEnd: orange.periodEnd,

                    red: red.days,
                    redStart: red.periodStart,
                    redMiddle: red.periodMiddle,
                    redEnd: red.periodEnd
                }}
                selectedDays={new Date(this.props.selectedDay)}
                firstDayOfWeek={1}
                todayButton="Go to Today"
                onDayClick={this.handleDayClick}

                className="Birthdays"
                renderDay={this.renderDay}
                onTodayButtonClick={(day) => this.handleDayClick(day)}
                onDayclassName="calendar" />
        );
    }
};

const mapStateToProps = (state) => {
    return {
        selectedDay: state.filters.date,
        calendarData: utils.getCalendarData(state.habits)
    };
};

const mapDispatchToProps = (dispatch) => ({
    setDate: (date) => dispatch(setDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(HabitDayPicker);