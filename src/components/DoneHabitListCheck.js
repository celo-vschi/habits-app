import React from 'react';
import { connect } from 'react-redux';
import { AiFillCaretDown } from "react-icons/ai";
import HabitListCheckItem from './HabitListCheckItem';
import HabitListCheckTitle from './HabitListCheckTitle';
import * as utils from '../utils/utils';

export const DoneHabitListCheck = (props) => {
    const doneHabits = props.habits.filter((habit) => habit.done);
    if (doneHabits.length > 0) {
        return (
            <div>
                <div className="widget-header">
                    <div className="widget-header-item">
                        <button className="button--link collapse-button" onClick={collapse}>
                            <AiFillCaretDown size={25} />
                        </button>
                    </div>
                    <div className="widget-header-item">
                        <h3>Finished Habits</h3>
                    </div>
                </div>
                <div className="widget collapsible">
                    {doneHabits.map((habit, i) => {
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
                                    last={doneHabits.length === i + 1}
                                    {...habit}
                                    date={props.date}
                                    props={props}
                                />
                            )
                    })}
                </div>
            </div>
        )

    } else {
        return null;
    }

};

const collapse = () => {
    var collapsible = document.getElementsByClassName("collapsible")[0];
    var children = collapsible.childNodes;
    for (var i = 0; i < children.length; i++) {
        var e = children[i];
        if (e.style.display === "block") {
            e.style.display = "none";
        } else {
            e.style.display = "block";
        }
    }
}

const mapStateToProps = (state) => {
    return {
        habits: utils.habitsForDay(state.habits, state.filters),
        date: state.filters.date
    };
};

export default connect(mapStateToProps)(DoneHabitListCheck);
