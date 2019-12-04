import React from 'react';

export default class HabitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.habit ? props.habit.name : '',
            error: ''
        };
    };

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.name || !this.state.name) {
            this.setState(() => ({ error: 'Please provide a name!' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                name: this.state.name,
            });
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    className="text-input"
                    placeholder="e.g. Drink more water"
                    autoFocus
                    value={this.state.name}
                    onChange={this.onNameChange}
                />
                <div>
                    <button className="button">Save Habit</button>
                </div>
            </form>
        )
    };

};