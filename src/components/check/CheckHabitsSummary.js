import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as utils from '../../utils/utils';
import { setCheckStartDate, setCheckEndDate } from '../../actions/filters';

export class CheckHabitsSummary extends React.Component {

    resetPicker = () => {
        this.props.setCheckStartDate(undefined);
        this.props.setCheckEndDate(undefined);
    }

    render() {
        const { from, to } = {
            from: this.props.filters.checkStartDate,
            to: this.props.filters.checkEndDate
        }

        return (
            <div className="dashboard-item__left">
                <div className="widget-header">
                    <div className="widget-header-item">
                        <button className="button--link" onClick={this.resetPicker}>Reset</button>
                        <Link to="/edit">
                            <button className="button">Habits Check</button>
                        </Link>
                    </div>
                    <div className="widget-header-item">
                        <h3>
                            <span>{!from ? '<start>' : utils.prettifyDateShort(from)} </span>
                        to
                         <span> {!to ? '<end>' : utils.prettifyDateShort(to)}</span>
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({ filters: state.filters });

const mapDispatchToProps = (dispatch) => ({
    setCheckStartDate: (date) => dispatch(setCheckStartDate(date)),
    setCheckEndDate: (date) => dispatch(setCheckEndDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckHabitsSummary);
