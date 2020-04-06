import React from 'react';
import CheckHabitsPeriodPicker from './CheckHabitsPeriodPicker';
import CheckHabitsSummary from './CheckHabitsSummary';

const CheckHabitsPage = () => (
    <div className="content-container dashboard-container">
        <CheckHabitsSummary />
        <CheckHabitsPeriodPicker />
    </div>
);

export default CheckHabitsPage;