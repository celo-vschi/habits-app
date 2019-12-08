import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as utils from '../utils/utils';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { incrementDate, decrementDate } from '../actions/filters';
import HabitListCheck from './HabitListCheck';

export class HabitsSummary extends React.Component {
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
                        <h3>{this.props.prettyDate}<span> [{this.props.dailySummary}]</span></h3>
                        <button className="button--link" onClick={this.props.decrementDate}>
                            <AiFillCaretLeft size={25} />
                        </button>
                        <button className="button--link" onClick={this.props.incrementDate}>
                            <AiFillCaretRight size={25} />
                        </button>
                    </div>
                </div>
                <HabitListCheck />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        date: state.filters.date,
        prettyDate: utils.prettifyDate(state.filters.date),
        dailySummary: utils.getDailySummary(state.habits, state.filters.date)
    };
};

const mapDispatchToProps = (dispatch) => ({
    incrementDate: () => dispatch(incrementDate()),
    decrementDate: () => dispatch(decrementDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(HabitsSummary);
