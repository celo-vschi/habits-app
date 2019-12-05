import React from 'react';
import { connect } from 'react-redux';
import selectHabits from '../selectors/habits-per-day';
import HabitListItemCheck from './HabitListItemCheck';

export const HabitList = (props) => (
    <div className="content-container">
        <div className="list-body">
            {props.habits.map((habit) => (
                <HabitListItemCheck key={habit.id} {...habit} date={props.date} props={props} />
            ))}
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        habits: selectHabits(state.habits, state.filters),
        date: state.filters.date
    };
};

export default connect(mapStateToProps)(HabitList);
