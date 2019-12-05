import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { incrementDate, decrementDate } from '../actions/filters';

export class HabitsSummary extends React.Component {
    incrementDateOnClick = ({ date }) => {
        this.props.incrementDate();
    };

    decrementDateOnClick = () => {
        this.props.decrementDate();
    };

    render() {
        return (
            <div className="page-header" >
                <div className="content-container">
                    <h1 className="page-header__title">
                        <span>{this.props.date}</span>
                    </h1>
                    <div className="page-header__actions">
                        <Link className="button" to="/create">Add Habit</Link>
                    </div>
                    <div>
                        <button onClick={this.incrementDateOnClick}>+1</button>
                        <button onClick={this.decrementDateOnClick}>-1</button>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        date: state.filters.date
    };
};

const mapDispatchToProps = (dispatch) => ({
    incrementDate: () => dispatch(incrementDate()),
    decrementDate: () => dispatch(decrementDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(HabitsSummary);
