import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { FaCalendar, FaCalendarTimes } from "react-icons/fa";
import arrayMove from 'array-move';
import * as utils from '../utils/utils';
import { startEditHabit } from '../actions/habits';

export class ReorderHabitsModal extends React.Component {
    state = {
        habits: this.props.habits,
        showDone: false
    }

    reorderHabits = () => {
        this.state.habits.forEach((habit, index) => {
            const found = this.props.habits.find((propHabit) => (propHabit.id == habit.id));
            if (found) {
                const order = {
                    order: index + 1
                }
                this.props.startEditHabit(habit.id, order);
                this.props.closeModal();
            }
        });
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ habits }) => ({
            habits: arrayMove(habits, oldIndex, newIndex),
        }));
    };

    toggleShowDone = () => {
        this.setState((prevState) => ({ showDone: !prevState.showDone }));
    }

    render() {
        return (
            <Modal
                ariaHideApp={false}
                isOpen={this.props.isOpen}
                onRequestClose={this.props.closeModal}
                contentLabel="Reorder Habits"
                closeTimeoutMS={200}
                className="modal"
            >
                <h3 className="modal__title">Reorder Habits</h3>
                <p className="modal__body">
                    Drag and drop to change order.
                    Press <button onClick={this.toggleShowDone} className="button--link">
                        {this.state.showDone ? <FaCalendar /> : <FaCalendarTimes />}
                    </button> to
                    toggle strikethrough.</p>
                <SortableList habits={this.state.habits} onSortEnd={this.onSortEnd} showDone={this.state.showDone} />
                <div className="modal__buttons">
                    <button onClick={this.props.closeModal} className="button--link">Cancel</button>
                    <button onClick={this.reorderHabits} className="button">Save</button>
                </div>
            </Modal>
        )
    }
}

const SortableItem = SortableElement(({ value, showDone, done, i }) =>
    <p className="habit-ordering">
        {showDone && done ? (<s>{i + 1}. {value}</s>) : (<span>{i + 1}. {value}</span>)}
    </p>
);

const SortableList = SortableContainer(({ habits, showDone }) => {
    return (
        <div className="widget">
            {habits.map((value, index) => (
                <SortableItem key={`item-${value.name}`} index={index} i={index} value={value.name} showDone={showDone} done={value.done} />
            ))}
        </div>
    );
});

const mapStateToProps = (state) => {
    return {
        habits: utils.habitsForDayAndFuture(state.habits, state.filters)
    };
};

const mapDispatchToProps = (dispatch) => ({
    startEditHabit: (id, order) => { dispatch(startEditHabit(id, order)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReorderHabitsModal);



