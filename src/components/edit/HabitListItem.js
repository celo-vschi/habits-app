import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRemoveHabit } from '../../actions/habits';

export class HabitListItem extends React.Component {
    onClick = () => {
        this.props.startRemoveHabit(this.props.id);
    };

    render() {
        const last = this.props.last;
        const name = this.props.name;
        const id = this.props.id;
        return (
            <div className={last ? "habit habit__last" : "habit"}>
                <Link to={`/edit/${id}`}>
                    <p className="habit__text">
                        {name}
                    </p>
                </Link>
                <div className="habit__right">
                    <button onClick={this.onClick} className="button--link">Remove Habit</button>
                </div>
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startRemoveHabit: (id) => { dispatch(startRemoveHabit({ id })) }
});

export default connect(undefined, mapDispatchToProps)(HabitListItem);