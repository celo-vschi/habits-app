import React from 'react';
import { connect } from 'react-redux';
import * as utils from '../utils/utils';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { incrementDate, decrementDate } from '../actions/filters';

export class HabitsSummary extends React.Component {
    render() {
        return (
            <div className="page-header" >
                <div className="content-container">
                    <div className="summary-navigation">
                        <a onClick={this.props.decrementDate}>
                            <div>
                                <GoChevronLeft size={32} />
                            </div>
                        </a>
                        <h1 className="page-header__title">
                            Viewing habits for <span>{this.props.prettyDate}</span>
                        </h1>
                        <a onClick={this.props.incrementDate}>
                            <div>
                                <GoChevronRight size={32} />
                            </div>
                        </a>
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
