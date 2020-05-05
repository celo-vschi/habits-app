import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HabitListCheckItem from './HabitListCheckItem';
import HabitListCheckTitle from './HabitListCheckTitle';
import * as utils from '../utils/utils';

export const NotDoneHabitListCheck = (props) => {
    const notDoneHabits = props.habits.filter((habit) => !habit.done);
    const noHabits = props.habits.length == 0;

    if (notDoneHabits.length > 0) {
        
        return (
            <div className="widget">
                {notDoneHabits.map((habit, i) => {
                    return habit.name.includes('_') ? (
                        <HabitListCheckTitle
                            key={habit.id}
                            {...habit}
                            date={props.date}
                            props={props}
                        />
                    ) : (
                            <HabitListCheckItem
                                key={habit.id}
                                last={notDoneHabits.length === i + 1}
                                {...habit}
                                date={props.date}
                                props={props}
                            />
                        )
                })}
            </div>
        )

    } else if (notDoneHabits.length == 0 && noHabits) {
        return (
            <div className="widget">
                <Link className="button--link" to="/create">
                    <p className="widget__message">You have no habits. Click here to add a habit.</p>
                </Link>
            </div>
        )

    } else {
        return (
            <div className="widget">
                <p className="widget__message">All habits done for today!</p>
            </div>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        habits: utils.habitsForDay(state.habits, state.filters),
        date: state.filters.date
    };
};

export default connect(mapStateToProps)(NotDoneHabitListCheck);
