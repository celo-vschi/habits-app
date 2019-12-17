import React from 'react';
import { Link } from 'react-router-dom';
import { GoListOrdered } from "react-icons/go";
import HabitList from './HabitList';
import ReorderHabitsModal from '../ReorderHabitsModal';
import { render } from 'react-dom';

export class EditHabitsPage extends React.Component {
    state = {
        isModalOpen: false
    };

    openModal = () => {
        this.setState(() => ({ isModalOpen: true }));
    }

    closeModal = () => {
        this.setState(() => ({ isModalOpen: false }));
    }

    render() {
        return (
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
                            <button className="button--link" onClick={this.openModal}><GoListOrdered size={25} /></button>
                        </div>
                    </div>
                </div>
                <HabitList />
                <ReorderHabitsModal
                    isOpen={this.state.isModalOpen}
                    closeModal={this.closeModal}
                />
            </div>
        )
    };
}
export default EditHabitsPage;