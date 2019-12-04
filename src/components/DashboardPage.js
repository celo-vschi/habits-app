import React from 'react';
import HabitList from './HabitList';
import { HabitsSummary } from './HabitsSummary';

const DashboardPage = () => (
    <div>
        <HabitsSummary />
        <HabitList />
    </div>
);

export default DashboardPage;