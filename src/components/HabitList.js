import React from 'react';
import { connect } from 'react-redux';
import HabitListItem from './HabitListItem';

export const HabitList = (props) => (
    <div className="content-container">
        <div className="list-header">Habits</div>
        <div className="list-body">
            {
                props.habits.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No habits</span>
                    </div>
                ) : (
                        props.habits.map((habit) => (
                            <HabitListItem key={habit.id} {...habit} props={props} />
                        ))
                    )
            }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        habits: state.habits
    };
};

export default connect(mapStateToProps)(HabitList);
