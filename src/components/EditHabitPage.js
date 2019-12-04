import React from 'react';
import { connect } from 'react-redux';
import HabitForm from './HabitForm';
import { startEditHabit, startRemoveHabit } from '../actions/habits';

export class EditHabitPage extends React.Component {
    onSubmit = (habit) => {
        console.log(habit);
        this.props.startEditHabit(this.props.habit.id, habit);
        this.props.history.push('/');
    };

    onClick = () => {
        this.props.startRemoveHabit(this.props.habit.id);
        this.props.history.push('/');
    };

    render() {
        console.log(this.props);
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title"> Edit Habit </h1>
                    </div>
                </div>
                <div className="content-container">
                    <HabitForm
                        habit={this.props.habit}
                        onSubmit={this.onSubmit} />
                    <button className="button button--secondary" onClick={this.onClick}>Remove Habit</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    habit: state.habits.find((habit) => habit.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    startEditHabit: (id, habit) => { dispatch(startEditHabit(id, habit)) },
    startRemoveHabit: (id) => { dispatch(startRemoveHabit({ id })) }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditHabitPage);