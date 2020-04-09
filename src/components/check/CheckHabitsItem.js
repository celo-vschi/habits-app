import React from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../../utils/utils';

export default class CheckHabitsItem extends React.Component {
    render() {
        const last = this.props.last;
        const name = this.props.name;
        const value = this.props.value;
        const id = this.props.id;
        // const startingDate = utils.prettifyDate(this.props.startingDate);
        return (
            <div className={last ? "habit habit__last" : "habit"}>
                <p className="habit__text">
                    {value} - {name}
                </p>
                {/* <span className="habit__subtext">from {startingDate}</span> */}
            </div>
        );
    }
};