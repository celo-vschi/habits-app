import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as utils from '../utils/utils';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { incrementDate, decrementDate } from '../actions/filters';

export class HabitsSummary extends React.Component {
    render() {
        return (
            <div className="page-header" >
                <div className="content-container">
                    <div className="widget-header">
                        <div className="widget-header-item">
                            <Link className="button--link" to="/edit">Habit List</Link>
                        </div>
                        <div className="widget-header-item">
                            <h3>{this.props.prettyDate}</h3>
                            <button className="button--link" onClick={this.props.decrementDate}>
                                <AiFillCaretLeft size={25} />
                            </button>
                            <button className="button--link" onClick={this.props.incrementDate}>
                                <AiFillCaretRight size={25} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        date: state.filters.date,
        prettyDate: utils.prettifyDate(state.filters.date)
    };
};

const mapDispatchToProps = (dispatch) => ({
    incrementDate: () => dispatch(incrementDate()),
    decrementDate: () => dispatch(decrementDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(HabitsSummary);
