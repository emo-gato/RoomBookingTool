import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarComponent.css'; // Import the CSS for the custom modal

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/events')
      .then(response => {
        const formattedEvents = response.data.map(event => ({
          id: event.id,
          title: event.name,
          start: new Date(event.date_time),
          end: new Date(event.date_time),
          ...event
        }));
        setEvents(formattedEvents);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: 'pink',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick}
      />

      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEvent.title}</h2>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p><strong>Start:</strong> {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm a')}</p>
            <p><strong>End:</strong> {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm a')}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
