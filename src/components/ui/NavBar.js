import React from 'react';

const NavBar = () => {

    return (
        <div className="navbar navbar-dar bg-dark mb-4">
            <span className="navbar-brand">
                Pedro
            </span>
            <button
            className="btn btn-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span>Salir</span>
            </button>
        </div>
    )
}

export default NavBar
