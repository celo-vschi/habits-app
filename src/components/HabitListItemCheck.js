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
    handleChange = (e) => {
        const checked = e.target.value;
        if (checked === 'true') {
            this.markUndone();
        } else {
            this.markDone();
        }
    }
    render() {
        return (
            <div className={this.props.last ? "habit habit__last" : "habit"}>
                <input
                    type="checkbox"
                    checked={this.props.done}
                    value={this.props.done}
                    onChange={this.handleChange}
                />
                <p className="habit__text">{this.props.name}</p>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startMarkHabit: (id, date, done) => dispatch(startMarkHabit({ id, date, done }))
});

export default connect(undefined, mapDispatchToProps)(HabitListItemCheck);