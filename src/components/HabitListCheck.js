import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HabitListItemCheck from './HabitListItemCheck';
import * as utils from '../utils/utils';

export const HabitListCheck = (props) => (
    <div className="widget">
        {props.habits.length > 0 ?
            (props.habits.map((habit, i) => (
                <HabitListItemCheck
                    key={habit.id}
                    last={props.habits.length === i + 1}
                    {...habit}
                    date={props.date}
                    props={props}
                />
            ))) : (
                <Link className="button--link" to="/create">
                    <p className="widget__message">You have no habits. Click here to add a habit.</p>
                </Link>
            )}
    </div>
);

const mapStateToProps = (state) => {
    return {
        habits: utils.habitsForDay(state.habits, state.filters),
        date: state.filters.date
    };
};

export default connect(mapStateToProps)(HabitListCheck);
