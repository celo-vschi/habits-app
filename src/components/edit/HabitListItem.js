import React from 'react';
import { Link } from 'react-router-dom';

export default class HabitListItem extends React.Component {
    setModalDataInternal = () => {
        this.props.setModalData(this.props.id);
    }

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
                    <button onClick={this.setModalDataInternal} className="button--link">Remove Habit</button>
                </div>
            </div>
        );
    }
};