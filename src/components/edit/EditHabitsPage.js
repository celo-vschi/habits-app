import React from 'react';
import HabitList from './HabitList';

const EditHabitsPage = () => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title"> Edit Habits </h1>
            </div>
        </div>
        <HabitList />
    </div>
);

export default EditHabitsPage;