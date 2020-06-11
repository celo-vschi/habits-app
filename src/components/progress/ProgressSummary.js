import React from 'react';
import { connect } from 'react-redux';
import * as utils from '../../utils/utils';

export class ProgressSummary extends React.Component {
    render() {
        console.log(this.props.habits, this.props.date);
        return (
            <div className="dashboard-item__left">
                <div className="widget-header">
                    <div className="widget-header-item"></div>
                    <div className="widget-header-item">
                        <h3>Progress @ <span> meditate</span></h3>
                    </div>
                </div>
                <div className="widget">
                    <div className={"habit"}>
                        <p className="habit__text">
                            Total times done: 210
                        </p>
                    </div>
                    <div className={"habit"}>
                        <p className="habit__text">
                            Completion rate:  87.5%
                        </p>
                    </div>
                    <div className={"habit"}>
                        <p className="habit__text">
                            Current streak: 12
                        </p>
                    </div>
                    <div className={"habit habit__last"}>
                        <p className="habit__text">
                            Best streak: 20
                        </p>
                    </div>
                </div>
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


export default connect(mapStateToProps, undefined)(ProgressSummary);
