import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';
import { setDate } from '../actions/filters';
import * as utils from '../utils/utils';

export class HabitDayPicker extends React.Component {
    state = {
        selectedDay: null
    };

    handleDayClick = (day, { selected }) => {
        this.setState(() => ({ selectedDay: selected ? undefined : day }));
        const date = moment(day).format('YYYY-MM-DD');
        this.props.setDate(date);
    };

    render() {
        return (
            <DayPicker
                modifiers={{
                    green: this.props.calendarData.green,
                    orange: this.props.calendarData.orange,
                    red: this.props.calendarData.red
                }}
                selectedDays={this.state.selectedDay}
                firstDayOfWeek={1}
                onDayClick={this.handleDayClick}
                onDayclassName="calendar" />
        );
    }
};

const mapStateToProps = (state) => {
    return {
        calendarData: utils.getCalendarData(state.habits)
    };
};

const mapDispatchToProps = (dispatch) => ({
    setDate: (date) => dispatch(setDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(HabitDayPicker);