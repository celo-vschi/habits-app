import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';
import { setDate } from '../actions/filters';
import * as utils from '../utils/utils';

export class HabitDayPicker extends React.Component {
    handleDayClick = (day) => {
        const date = moment(day).format('YYYY-MM-DD');
        this.props.setDate(date);
    };

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