import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { Link } from 'react-router-dom';
import * as utils from '../../utils/utils';


export default class CheckHabitsPage extends React.Component {
    state = {
        from: undefined,
        to: undefined
    };

    resetPicker = () => {
        this.setState(() => ({
            from: undefined,
            to: undefined
        }));
    }

    handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(() => (range));
    };

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };

        return (
            <div className="content-container dashboard-container">

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

                    <div className="widget">
                        
                    </div>
                </div>

                <div>
                    <DayPicker
                        className="Selectable"
                        firstDayOfWeek={1}
                        selectedDays={[from, { from, to }]}
                        modifiers={modifiers}
                        onDayClick={this.handleDayClick}
                    />
                </div>

            </div >
        );
    }
}
