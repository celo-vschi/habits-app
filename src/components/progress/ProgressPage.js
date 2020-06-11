import React from 'react';
import { connect } from 'react-redux';
import HabitDayPicker from '../HabitDayPicker';
import ProgressSummary from './ProgressSummary';

export default class ProgressPage extends React.Component {

    render() {
        return (
            <div className="content-container dashboard-container">
                <ProgressSummary />
                <HabitDayPicker />
            </div>
        );
    }
}