import React from 'react'

const CalendarEvent = ({event}) => {
    const {title, user} = event;

    return (
        <div>
            <strong>{title}</strong> 
            <br/>
            <strong>{user.name}</strong>
        </div>
    )
}

export default CalendarEvent