import React from 'react';
import { connect } from 'react-redux';
import HabitListItem from './HabitListItem';

export const HabitList = (props) => (
    <div className="content-container">
        <div className="widget">
            {
                props.habits.length === 0 ? (
                    <p className="widget__message">No habits</p>
                ) : (
                        props.habits.map((habit, i) => (
                            <HabitListItem
                                last={props.habits.length === i + 1}
                                key={habit.id}
                                {...habit}
                                props={props}
                            />
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
