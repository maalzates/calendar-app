import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';


import NavBar from '../ui/NavBar'
import { messages } from '../../helpers/calendar-mesagges-spanish';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';


moment.locale('es');

const localizer = momentLocalizer(moment);      



const CalendarScreen = () => {
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(({calendar}) => calendar);
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month' )
    
    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        
        const style = {
            backgroundColor: '#36CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }
        return {
            style
        }
    }

    return (
        <div>
            <NavBar/>
            <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent}} // Le pasamos el evnto como argumento.               
            />
            {(activeEvent) && <DeleteEventFab /> }
            <AddNewFab />


            <CalendarModal />
        </div>
    )
}


export default CalendarScreen
