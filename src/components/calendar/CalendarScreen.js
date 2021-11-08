import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';


import NavBar from '../ui/NavBar'
import { messages } from '../../helpers/calendar-mesagges-spanish';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventStartLoading } from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';


moment.locale('es');

const localizer = momentLocalizer(moment);      



const CalendarScreen = () => {
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(({calendar}) => calendar);
    const {uid} = useSelector(({auth}) => auth);
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month' )

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])

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
            backgroundColor: (uid === event.user._id ) ? '#36CF7' : '#465660',
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
