import React from 'react';
import HabitDayPicker from './HabitDayPicker';
import HabitsSummary from './HabitsSummary';

const DashboardPage = () => (
    <div className="content-container dashboard-container">
        <HabitsSummary />
        <HabitDayPicker />
    </div>
);

export default DashboardPage;