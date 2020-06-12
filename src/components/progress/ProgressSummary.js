import React from 'react';
import { connect } from 'react-redux';
import * as utils from '../../utils/utils';

export class ProgressSummary extends React.Component {
    render() {
        return (
            <div className="dashboard-item__left">
                <div className="widget-header">
                    <div className="widget-header-item"></div>
                    <div className="widget-header-item">
                        <h3>Progress @ <span> {this.props.progress.name}</span></h3>
                    </div>
                </div>
                <div className="widget">
                    <div className={"habit"}>
                        <p className="habit__text">
                            Total times done: {this.props.progress.total}
                        </p>
                    </div>
                    <div className={"habit"}>
                        <p className="habit__text">
                            Completion rate: {this.props.progress.completion * 100}%
                        </p>
                    </div>
                    <div className={"habit"}>
                        <p className="habit__text">
                            Current streak: {this.props.progress.currentStreak}
                        </p>
                    </div>
                    <div className={"habit habit__last"}>
                        <p className="habit__text">
                            Best streak: {this.props.progress.bestStreak}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state, props) => {
    return {
        progress: utils.getHabitProgress(props.habitId, state.habits),
        habits: utils.habitsForDay(state.habits, state.filters),
        date: state.filters.date,
    };
};


export default connect(mapStateToProps, undefined)(ProgressSummary);
