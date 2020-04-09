import React from 'react';
import { connect } from 'react-redux';
import * as utils from '../../utils/utils';
import { setCheckStartDate, setCheckEndDate } from '../../actions/filters';
import CheckHabitsItem from './CheckHabitsItem';

export class CheckHabitsWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            habits: undefined,
            error: ''
        };
    };

    resetPicker = () => {
        this.props.setCheckStartDate(undefined);
        this.props.setCheckEndDate(undefined);
        this.setState(() => ({
            error: '',
            habits: undefined
        }));
    }

    computeHabitCheck = () => {
        const { from, to } = {
            from: this.props.filters.checkStartDate,
            to: this.props.filters.checkEndDate
        }
        if (!from || !to) {
            this.setState(() => ({
                error: 'Please select a period!',
                habits: undefined
            }));
        } else {
            const map = utils.checkHabits(this.props.habits, from, to);
            this.setState(() => ({
                error: '',
                habits: map
            }));
        }
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
                        <button className="button" onClick={this.computeHabitCheck}>Habits Check</button>
                    </div>
                    <div className="widget-header-item">
                        <h3>
                            <span>{!from ? '<start>' : utils.prettifyDateShort(from)} </span>
                        to
                         <span> {!to ? '<end>' : utils.prettifyDateShort(to)}</span>
                        </h3>
                    </div>
                </div>

                <div className="widget">
                    {!this.state.habits && <p className="widget__message">Select a period and press the <b>Habit Check</b> button</p>}

                    {(typeof this.state.habits !== 'undefined') && (this.state.habits.size > 0 ?
                        Array.from(this.state.habits, ([key, value], i) =>
                            <CheckHabitsItem
                                key={key}
                                last={this.state.habits.size === i + 1}
                                name={key}
                                value={value}
                            />
                        ) :
                        <p className="widget__message">No missed habits for the selected period. Good job!</p>)}

                    {this.state.error && <p className="widget-error">{this.state.error}</p>}
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    filters: state.filters,
    habits: state.habits
});

const mapDispatchToProps = (dispatch) => ({
    setCheckStartDate: (date) => dispatch(setCheckStartDate(date)),
    setCheckEndDate: (date) => dispatch(setCheckEndDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckHabitsWidget);
