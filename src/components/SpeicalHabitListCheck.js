import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SpecialHabitListCheckItem from './SpecialHabitListCheckItem';
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
                {props.habits.map((habit, i) => (
                    <SpecialHabitListCheckItem
                        key={habit.id}
                        last={props.habits.length === i + 1}
                        {...habit}
                        date={props.date}
                        props={props}
                    />
                ))}
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
