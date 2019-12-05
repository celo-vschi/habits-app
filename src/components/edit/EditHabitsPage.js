import React from 'react';
import { Link } from 'react-router-dom';
import HabitList from './HabitList';

const EditHabitsPage = () => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title"> Edit Habits </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Habit</Link>
                </div>
            </div>
        </div>
        <HabitList />
    </div>
);

export default EditHabitsPage;