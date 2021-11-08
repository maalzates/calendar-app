import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import {PublicRoute} from './PublicRoute';
import {PrivateRoute} from './PrivateRoute';



const AppRouter = () => {

    const {checking, uid} = useSelector(({auth}) => auth)

    const dispatch = useDispatch();

    useEffect(() => {
    
        dispatch(startChecking())

    }, [dispatch])

    if (checking) {
        return (<h5>Espere...</h5>)
    }

    return (
        <Router>
            <Switch>
                <>                
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={LoginScreen}
                        isLoggedIn={!!uid}
                    />
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={CalendarScreen}
                        isLoggedIn={!!uid}
                    />
                </>
            </Switch>
        </Router>
    )
}

export default AppRouter
