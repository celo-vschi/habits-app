import React from 'react';
import Modal from 'react-modal'

export class AddNoteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            note: props.note ? props.note : '',
        };
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    addNoteToHabit = () => {
        const note =this.state.note;
        this.props.handleAddNoteToHabit(note);
    }

    render = () => (
        <Modal
            ariaHideApp={false}
            isOpen={!!this.props.habitIdToBeAddedNoteTo}
            onRequestClose={this.props.handleClearModalData}
            contentLabel="Delete habit"
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">Add Note to Habit</h3>
            <div className="modal__body">
                <input
                    type="text"
                    className="habit-input"
                    autoFocus
                    value={this.state.note}
                    onChange={this.onNoteChange}
                />
            </div>
            <div className="modal__buttons">
                <button
                    className="button--link"
                    onClick={this.props.handleClearModalData}>Cancel</button>
                <button
                    className="button"
                    onClick={this.addNoteToHabit}>Save</button>
            </div>
        </Modal>
    )
}