import React from 'react';
import Modal from 'react-modal'

const DeleteHabitModal = (props) => (
    <Modal
        ariaHideApp={false}
        isOpen={!!props.habitIdToBeDeleted}
        onRequestClose={props.handleClearModalData}
        contentLabel="Delete habit"
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">Delete Habit</h3>
        <p className="modal__body">Are you sure you want to delete this habit?</p>
        <div className="modal__buttons">
            <button
                className="button--link"
                onClick={props.handleClearModalData}>Cancel</button>
            <button
                className="button"
                onClick={props.handleDeleteHabit}>Delete</button>
        </div>
    </Modal>
);

export default DeleteHabitModal;