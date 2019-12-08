import React from 'react';
import { connect } from 'react-redux';
import HabitForm from './HabitForm';
import { startAddHabit } from '../actions/habits';

export class AddHabitPage extends React.Component {
    onSubmit = (habit) => {
        this.props.startAddHabit(habit);
        this.props.history.goBack();
    };

    render() {
        return (
            <div className="content-container">
                <HabitForm title="Add Habit" onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddHabit: (habit) => { dispatch(startAddHabit(habit)) }
});

export default connect(undefined, mapDispatchToProps)(AddHabitPage);