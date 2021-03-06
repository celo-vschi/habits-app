import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <div className="header-title-container">
                    <Link className="header__title" to="/dashboard">
                        <h1>Dashboard</h1>
                    </Link>
                    <Link className="header__title" to="/check">
                        <h3>Habits Check</h3>
                    </Link>
                </div>
                <button className="header__button" onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);