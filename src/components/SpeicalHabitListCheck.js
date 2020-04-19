import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HabitListCheckItem from './HabitListCheckItem';
import HabitListCheckTitle from './HabitListCheckTitle';
import * as utils from '../utils/utils';

export const SpecialHabitListCheck = (props) => (
    props.habits.length > 0 ? (
        <div>
            <div className="widget-header">
                <div className="widget-header-item"></div>
                <div className="widget-header-item">
                    <h3>Special Habits</h3>
                </div>
            </div>
            <div className="widget">
                {props.habits.length > 0 ?
                    (props.habits.map((habit, i) => {
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
                                    last={props.habits.length === i + 1}
                                    {...habit}
                                    date={props.date}
                                    props={props}
                                />
                            )
                    })) : (
                        <Link className="button--link" to="/create">
                            <p className="widget__message">You have no habits. Click here to add a habit.</p>
                        </Link>
                    )}
            </div>
        </div>
    ) : null
)


const mapStateToProps = (state) => {
    return {
        habits: utils.specialHabitsForDay(state.habits, state.filters),
        date: state.filters.date
    };
};

export default connect(mapStateToProps)(SpecialHabitListCheck);
