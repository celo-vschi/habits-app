import React from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import * as utils from '../../utils/utils';


export default class CheckHabitsPage extends React.Component {
    state = {
        from: undefined,
        to: undefined
    };

    resetPicker = () => {
        this.setState(() => ({
            from: undefined,
            to: undefined
        }));
    }

    handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(() => (range));
    };

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };

        return (
            <div className="content-container">
                <p>
                    {!from && !to && 'Please select the first day.'}
                    {from && !to && 'Please select the last day.'}
                    {from &&
                        to &&
                        `Selected from ${from.toLocaleDateString()} to
                    ${to.toLocaleDateString()}`}{' '}
                    {from && to && (
                        <button className="link"
                            onClick={this.resetPicker}>
                            Reset
                        </button>
                    )}
                </p>
                <DayPicker
                    className="Selectable"
                    numberOfMonths={2}
                    firstDayOfWeek={1}
                    month={utils.getNextMonth().toDate()}
                    selectedDays={[from, { from, to }]}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                />
            </div>
        );
    }
}
