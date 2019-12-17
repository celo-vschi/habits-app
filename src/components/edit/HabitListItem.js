import React from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../../utils/utils';

export default class HabitListItem extends React.Component {
    setModalDataInternal = () => {
        this.props.setModalData(this.props.id);
    }

    render() {
        const last = this.props.last;
        const name = this.props.name;
        const id = this.props.id;
        const startingDate = utils.prettifyDate(this.props.startingDate);
        return (
            <div className={last ? "habit habit__last" : "habit"}>
                <Link to={`/edit/${id}`}>
                    <p className="habit__text">
                        {name}
                    </p>
                    <span className="habit__subtext">from {startingDate}</span>
                </Link>
                <div className="habit__right">
                    <button onClick={this.setModalDataInternal} className="button--link">Remove Habit</button>
                </div>
            </div>
        );
    }
};