import React from 'react';
import { connect } from 'react-redux';
import DayPicker, { DateUtils } from 'react-day-picker';
import { setCheckStartDate, setCheckEndDate } from '../../actions/filters';

export class CheckHabitsPeriodPicker extends React.Component {

    constructor(props) {
        super(props);
        this.resetPicker();
    }

    resetPicker = () => {
        this.props.setCheckStartDate(undefined);
        this.props.setCheckEndDate(undefined);
    }

    handleDayClick = (day) => {
        const oldRange = this.createRangeObject();
        const range = DateUtils.addDayToRange(day, oldRange);

        this.props.setCheckStartDate(range.from);
        this.props.setCheckEndDate(range.to);
    };

    createRangeObject = () => ({
        from: this.props.filters.checkStartDate,
        to: this.props.filters.checkEndDate,
    });

    render() {
        const { from, to } = this.createRangeObject();
        const modifiers = { start: from, end: to };

        return (
            <DayPicker
                className="Selectable"
                firstDayOfWeek={1}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
            />
        );
    }
}

const mapStateToProps = (state) => ({ filters: state.filters });

const mapDispatchToProps = (dispatch) => ({
    setCheckStartDate: (date) => dispatch(setCheckStartDate(date)),
    setCheckEndDate: (date) => dispatch(setCheckEndDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckHabitsPeriodPicker);
