import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const HabitsSummary = () => {
    const now = moment().format('MMMM Do YYYY');
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">
                    3/4 habits completed for <span>{now}</span>
                </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Habit</Link>
                </div>
            </div>
        </div>
    )
}