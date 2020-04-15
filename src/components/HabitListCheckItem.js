import React from 'react';
import { connect } from 'react-redux';
import { startMarkHabit } from '../actions/habits';
import * as utils from '../utils/utils';

export class HabitListCheckItem extends React.Component {
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
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={this.props.done}
                        value={this.props.done}
                        onChange={this.handleChange}
                    />
                    <span className="checkbox-checkmark"></span>
                    <p className="habit__text">
                        {this.props.done ? (<s>{this.props.name}</s>) : (this.props.name)}
                    </p>
                    <span className="habit__subtext">
                        {this.props.streak}
                    </span>
                </label>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startMarkHabit: (id, date, done) => dispatch(startMarkHabit({ id, date, done }))
});

const mapStateToProps = (state, props) => ({
    streak: utils.getStreakText(utils.habitsForDay(state.habits, state.filters), props.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(HabitListCheckItem);