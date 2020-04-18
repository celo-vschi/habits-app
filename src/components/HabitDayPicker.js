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


    renderDay(day) {
        const birthdays = {
            3: ['Mirko'],
            10: ['Elena'],
            17: ['Irene'],
            4: ['Claudia'],
            11: ['Simone'],
            18: ['Marta'],
        };

        const date = day.getDate();
        const birthdayStyle = {
            position: 'absolute',
            fontSize: 5,
            bottom: 27,
            left: 9,
            // color: '#8357c5'
            color: '#a5afd6'

            // fontSize: '0.8em',
            // textAlign: 'right'
        };
        const cellStyle = {
            // height: 50,
            // width: 60,
            position: 'relative',
        };
        return (
            <div style={cellStyle} >
                <div>{date}</div>
                {birthdays[date] &&
                    birthdays[date].map((name, i) => (
                        <div key={i} style={birthdayStyle}>
                            <FaCircle />
                        </div>
                    ))}
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