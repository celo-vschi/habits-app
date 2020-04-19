import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate, } from 'react-day-picker/moment';
import * as utils from '../utils/utils';

export default class HabitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.habit ? props.habit.name : '',
            error: '',
            specialHabit: props.habit ? (!!props.habit.specialHabit && true) : false,
            selectedDay: props.habit ?
                utils.patternToDate(props.habit.startingDate) : moment().toDate(),
        };
    };

    handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        this.setState({
            selectedDay,
        });
    }

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };

    handleSpecialDayCheckboxChange = (e) => {
        const specialHabit = e.target.value != "true";
        this.setState(() => ({ specialHabit }))
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.name || !this.state.selectedDay) {
            this.setState(() => ({ error: 'Please provide a name and a starting date!' }));
        } else {
            this.setState(() => ({ error: '' }));
            const startingDate = utils.dateToPattern(this.state.selectedDay);
            this.props.onSubmit({
                name: this.state.name,
                startingDate,
                specialHabit: this.state.specialHabit
            });
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="widget-header">
                    <button className="button">Save Habit</button>
                    <div className="widget-header-item">
                        <h3> {this.props.title} </h3>
                    </div>
                </div>
                <div className="widget">
                    <div className="content-container">
                        <div className="widget-input-group">
                            <div className="widget-input">
                                <h3>Name</h3>
                                <input
                                    type="text"
                                    className="habit-input"
                                    placeholder="e.g. Drink more water"
                                    autoFocus
                                    value={this.state.name}
                                    onChange={this.onNameChange}
                                />
                            </div>

                            <div className="widget-input">
                                <h3>Starting Date</h3>
                                <DayPickerInput
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                    format={'YYYY-MM-DD'}
                                    value={this.state.selectedDay}
                                    onDayChange={this.handleDayChange}
                                    placeholder={utils.getCurrentDate()}
                                    dayPickerProps={{
                                        selectedDays: this.state.selectedDay,
                                        localeUtils: MomentLocaleUtils,
                                    }}
                                    inputProps={{ readOnly: true }}
                                />
                            </div>

                            <div className="widget-input">
                                <label className="checkbox-container__special">
                                    <h3>Special Habit</h3>
                                    <input
                                        type="checkbox"
                                        checked={this.state.specialHabit}
                                        value={this.state.specialHabit}
                                        onChange={this.handleSpecialDayCheckboxChange}
                                    />
                                    <span className="checkbox-checkmark__special"></span>

                                </label>
                            </div>

                            {this.state.error && <p className="widget-error">{this.state.error}</p>}
                        </div>
                    </div>
                </div>
            </form>
        )
    };

};