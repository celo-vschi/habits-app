import React from 'react';
import { Link } from 'react-router-dom';
import HabitList from './HabitList';

const EditHabitsPage = () => (
    <div>
        <div className="content-container">
            <div className="widget-header">
                <div className="widget-header-item">
                    <Link to="/create">
                        <button className="button">Add Habit</button>
                    </Link>
                </div>
                <div className="widget-header-item">
                    <h3> Habit List </h3>
                </div>
            </div>
        </div>
        <HabitList />
    </div>
);

export default EditHabitsPage;