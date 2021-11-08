import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

const NavBar = () => {
    const dispatch = useDispatch()
    const {name} = useSelector(({auth}) => auth)
    const handleLogout = () => {
        dispatch(startLogout());
    }
    
    return (
        <div className="navbar navbar-dar bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>
            <button
            className="btn btn-danger"
            onClick={handleLogout}
            >
                <i className="fas fa-sign-out-alt"></i>
                <span>Salir</span>
            </button>
        </div>
    )
}

export default NavBar
