import React from 'react';
import CheckHabitsPeriodPicker from './CheckHabitsPeriodPicker';
import CheckHabitsWidget from './CheckHabitsWidget';

const CheckHabitsPage = () => (
    <div className="content-container dashboard-container">
        <CheckHabitsWidget />
        <CheckHabitsPeriodPicker />
    </div>
);

export default CheckHabitsPage;