import React from 'react';
import ProgressCalendar from './ProgressCalendar';
import ProgressSummary from './ProgressSummary';

export default class ProgressPage extends React.Component {

    render() {
        const habitId = this.props.match.params.id;
        return (
            <div className="content-container dashboard-container">
                <ProgressSummary habitId={habitId} />
                <ProgressCalendar habitId={habitId} />
            </div>
        );
    }

}