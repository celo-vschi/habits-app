import React from 'react';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';
import * as utils from '../utils/utils';

export class HabitDayPicker extends React.Component {
    state = {
        selectedDay: null
    };

    handleDayClick = (day, { selected }) => {
        this.setState(() => ({ selectedDay: selected ? undefined : day }));
    };

    modifiers = {
        green: this.props.calendarData.green,
        orange: this.props.calendarData.orange,
        red: this.props.calendarData.red
    };

    render() {
        return (
            <DayPicker
                modifiers={this.modifiers}
                selectedDays={this.state.selectedDay}
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

export default connect(mapStateToProps)(HabitDayPicker);