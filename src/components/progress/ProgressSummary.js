import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as utils from '../../utils/utils';
import { FaCheck, FaChartBar } from "react-icons/fa";
import { GiTrophyCup, GiRoundStar } from "react-icons/gi";

export class ProgressSummary extends React.Component {
    render() {
        return (
            <div className="dashboard-item__left">
                <div className="widget-header">
                    <div className="widget-header-item">
                        <Link to="/edit">
                            <button className="button">Habit List</button>
                        </Link>
                    </div>
                    <div className="widget-header-item">
                        <h3>Progress @ <span> {this.props.progress.name}</span></h3>
                    </div>
                </div>
                <div className="widget">

                    <div className="habit">
                        <div className="progress">
                            <div className="progress-container">
                                <p className="progress-icon"><FaCheck size='25' /></p>
                                <p className="progress-text">Total times done</p>
                            </div>
                            <p className="progress-value">{this.props.progress.total}</p>
                        </div>
                    </div>

                    <div className="habit">
                        <div className="progress">
                            <div className="progress-container">
                                <p className="progress-icon"><FaChartBar size='25' /></p>
                                <p className="progress-text">Completion rate</p>
                            </div>
                            <p className="progress-value">{this.props.progress.completion}%</p>
                        </div>
                    </div>

                    <div className="habit">
                        <div className="progress">
                            <div className="progress-container">
                                <p className="progress-icon"><GiRoundStar size='25' /></p>
                                <p className="progress-text">Current streak</p>
                            </div>
                            <p className="progress-value">{this.props.progress.currentStreak}</p>
                        </div>
                    </div>

                    <div className="habit habit__last">
                        <div className="progress">
                            <div className="progress-container">
                                <p className="progress-icon"><GiTrophyCup size='25' /></p>
                                <p className="progress-text">Best streak</p>
                            </div>
                            <p className="progress-value">{this.props.progress.bestStreak}</p>
                        </div>
                    </div>

                </div>
            </div >
        )
    }
};

const mapStateToProps = (state, props) => {
    return {
        progress: utils.getHabitProgress(props.habitId, state.habits),
    };
};


export default connect(mapStateToProps, undefined)(ProgressSummary);
