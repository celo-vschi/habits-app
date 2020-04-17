import React from 'react';
import { connect } from 'react-redux';
import { startMarkHabit, startEditHabit } from '../actions/habits';
import * as utils from '../utils/utils';
import moment from 'moment';

export class HabitListCheckItem extends React.Component {
    markDone = () => {
        const id = this.props.id;
        const date = this.props.date;
        this.props.startMarkHabit(id, date, true);

        const halfDone = {
            halfDone: true
        };
        this.props.startEditHabit(this.props.id, halfDone);
    }

    markUndone = () => {
        const id = this.props.id;
        const date = this.props.date;
        this.props.startMarkHabit(id, date, false);
    }

    markHalfDone = (e) => {
        const halfDoneValue = !e.target.className.includes('checked');
        const halfDone = {
            halfDone: halfDoneValue
        }
        this.props.startEditHabit(this.props.id, halfDone);
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
        const showHalfCheck = !this.props.done && this.props.date == moment().format('YYYY-MM-DD');
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

                {showHalfCheck &&
                    <div className="habit__right">
                        <p
                            className={this.props.halfDone ? "half-check__checked" : "half-check"}
                            onClick={this.markHalfDone}>
                            x
                    </p>
                    </div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startMarkHabit: (id, date, done) => dispatch(startMarkHabit({ id, date, done })),
    startEditHabit: (id, halfDone) => { dispatch(startEditHabit(id, halfDone)) }
});

const mapStateToProps = (state, props) => ({
    streak: utils.getStreakText(utils.habitsForDay(state.habits, state.filters), props.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(HabitListCheckItem);