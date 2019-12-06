import React from 'react';
import { connect } from 'react-redux';
import { startMarkHabit } from '../actions/habits';

export class HabitListItemCheck extends React.Component {
    markDone = () => {
        const id = this.props.id;
        const date = this.props.date;
        this.props.startMarkHabit(id, date, true);
    }

    markUndone = () => {
        const id = this.props.id;
        const date = this.props.date;
        this.props.startMarkHabit(id, date, false);
    }
    render() {
        return (
            <a onClick={this.props.done ? this.markUndone : this.markDone} className="habit-check-container">
                <div className={this.props.done ? "habit-check-done" : "habit-check-undone"}>
                    <h3 >{this.props.name}</h3>
                </div>
            </a>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startMarkHabit: (id, date, done) => dispatch(startMarkHabit({ id, date, done }))
});

export default connect(undefined, mapDispatchToProps)(HabitListItemCheck);