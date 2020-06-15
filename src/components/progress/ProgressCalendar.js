import React from 'react';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';
import * as utils from '../../utils/utils';

export class ProgressCalendar extends React.Component {
    render() {
        const { green, red } = {
            green: this.props.calendarData.green,
            red: this.props.calendarData.red
        }
        return (
            <DayPicker
                modifiers={{
                    green: green.days,
                    greenStart: green.periodStart,
                    greenMiddle: green.periodMiddle,
                    greenEnd: green.periodEnd,

                    red: red.days,
                    redStart: red.periodStart,
                    redMiddle: red.periodMiddle,
                    redEnd: red.periodEnd
                }}

                className="Birthdays"
                renderDay={this.renderDay}
                onDayclassName="calendar" />
        );
    }
};

const mapStateToProps = (state, props) => {
    return {
        selectedDay: state.filters.date,
        calendarData: utils.getCalendarProgressData(state.habits, props.habitId)
    };
};

export default connect(mapStateToProps)(ProgressCalendar);