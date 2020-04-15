import React from 'react';
import { connect } from 'react-redux';
import HabitListItem from './HabitListItem';
import HabitListTitle from './HabitListTitle';
import DeleteHabitModal from '../DeleteHabitModal';
import { startRemoveHabit } from '../../actions/habits';
import * as utils from '../../utils/utils';

export class HabitList extends React.Component {
    state = {
        habitIdToBeDeleted: undefined
    };

    handleDeleteHabit = () => {
        const id = this.state.habitIdToBeDeleted;
        this.props.startRemoveHabit(id);
        this.handleClearModalData();
    };

    handleClearModalData = () => {
        this.setState(() => ({ habitIdToBeDeleted: undefined }));
    };

    setModalData = (habitIdToBeDeleted) => {
        this.setState(() => ({ habitIdToBeDeleted }));
    }

    render() {
        return (
            <div className="content-container">
                <div className="widget">
                    {
                        this.props.habits.length === 0 ? (
                            <p className="widget__message">No habits</p>
                        ) : (
                                this.props.habits.map((habit, i) => {
                                    return habit.name.includes('_') ? (
                                        <HabitListTitle
                                            last={this.props.habits.length === i + 1}
                                            key={habit.id}
                                            {...habit}
                                            setModalData={this.setModalData}
                                            props={this.props}
                                        />
                                    ) : (
                                            <HabitListItem
                                                last={this.props.habits.length === i + 1}
                                                key={habit.id}
                                                {...habit}
                                                setModalData={this.setModalData}
                                                props={this.props}
                                            />
                                        )
                                })
                            )
                    }
                </div>
                <DeleteHabitModal
                    habitIdToBeDeleted={this.state.habitIdToBeDeleted}
                    handleClearModalData={this.handleClearModalData}
                    handleDeleteHabit={this.handleDeleteHabit}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        habits: utils.orderHabits(state.habits)
    };
};

const mapDispatchToProps = (dispatch) => ({
    startRemoveHabit: (id) => { dispatch(startRemoveHabit({ id })) }
});

export default connect(mapStateToProps, mapDispatchToProps)(HabitList);