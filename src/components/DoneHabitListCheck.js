import React from 'react';
import { connect } from 'react-redux';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import HabitListCheckItem from './HabitListCheckItem';
import HabitListCheckTitle from './HabitListCheckTitle';
import * as utils from '../utils/utils';

export class DoneHabitListCheck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    };

    toggleCollapsing = () => {
        this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
    }

    render = (props) => {
        const doneHabits = this.props.habits.filter((habit) => habit.done);
        if (doneHabits.length > 0) {
            return (
                <div>
                    <div className="widget-header">
                        <div className="widget-header-item">
                            <button className="button--link" onClick={this.toggleCollapsing}>
                                {this.state.collapsed ? <AiFillCaretUp size={25} /> : <AiFillCaretDown size={25} />}
                            </button>
                        </div>
                        <div className="widget-header-item">
                            <h3>Finished Habits</h3>
                        </div>
                    </div>
                    <div className="widget">
                        <div style={{ display: this.state.collapsed ? 'block' : 'none' }}>
                            {doneHabits.map((habit, i) => {
                                return habit.name.includes('_') ? (
                                    <HabitListCheckTitle
                                        key={habit.id}
                                        {...habit}
                                        date={this.props.date}
                                        props={props}
                                    />
                                ) : (
                                        <HabitListCheckItem
                                            key={habit.id}
                                            last={doneHabits.length === i + 1}
                                            {...habit}
                                            date={this.props.date}
                                            props={props}
                                        />
                                    )
                            })}
                        </div>
                    </div>
                </div>
            )

        } else {
            return null;
        }

    };
}

const mapStateToProps = (state) => {
    return {
        habits: utils.habitsForDay(state.habits, state.filters),
        date: state.filters.date
    };
};

export default connect(mapStateToProps)(DoneHabitListCheck);
