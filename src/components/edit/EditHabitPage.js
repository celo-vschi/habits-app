import React from 'react';
import { connect } from 'react-redux';
import HabitForm from '../HabitForm';
import { startEditHabit } from '../../actions/habits';

export class EditHabitPage extends React.Component {
    onSubmit = (habit) => {
        this.props.startEditHabit(this.props.habit.id, habit);
        this.props.history.push('/edit');
    };

    render() {
        return (
            <div className="content-container">
                <HabitForm
                    habit={this.props.habit}
                    title="Edit Habit"
                    onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    habit: state.habits.find((habit) => habit.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    startEditHabit: (id, habit) => { dispatch(startEditHabit(id, habit)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditHabitPage);