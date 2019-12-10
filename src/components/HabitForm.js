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
            <form onSubmit={this.onSubmit}>
                <div className="widget-header">
                    <button className="button">Save Habit</button>
                    <div className="widget-header-item">
                        <h3> {this.props.title} </h3>
                    </div>
                </div>
                <div className="widget">
                    <input
                        type="text"
                        className="habit-input"
                        placeholder="e.g. Drink more water"
                        autoFocus
                        value={this.state.name}
                        onChange={this.onNameChange}
                    />
                    {this.state.error && <p className="widget-error">{this.state.error}</p>}
                    <div>

                    </div>
                </div>
            </form>
        )
    };

};