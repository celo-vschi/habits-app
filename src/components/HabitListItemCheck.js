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
            <div>
                <h3>{this.props.name}</h3>
                {
                    this.props.done ? (<button onClick={this.markUndone}>mark as undone</button>) : (
                        <button onClick={this.markDone}>mark as done</button>)
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startMarkHabit: (id, date, done) => dispatch(startMarkHabit({ id, date, done }))
});

export default connect(undefined, mapDispatchToProps)(HabitListItemCheck);