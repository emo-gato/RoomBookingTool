import React, { useEffect, useState } from "react";
import RoomsContent from "../components/RoomsContent";
import CalendarComponent from "../components/CalendarComponent"; // Import the CalendarComponent
import GroupComponent from "../components/GroupComponent"; // Import the GroupComponent
import FrameComponent3 from "../components/FrameComponent3"; // Ensure correct path to FrameComponent3
import axios from 'axios';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import { FaCalendarAlt } from 'react-icons/fa'; // Import calendar icon
import styles from "./RoomBooking.module.css";

const RoomBooking = () => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [removeId, setRemoveId] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: null,
    end: null
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/display');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchMyEvents = () => {
    const joinedEvents = JSON.parse(localStorage.getItem('joinedEvents')) || [];
    const myEventsList = events.filter(event => joinedEvents.includes(event.id));
    setMyEvents(myEventsList);
  };

  const handleRemoveEvent = () => {
    setEvents(events.filter(event => event.id !== parseInt(removeId)));
    setShowRemovePopup(false);
    setRemoveId("");
  };

  const handleSortEvents = () => {
    setEvents([...events].sort((a, b) => {
      const titleA = a.name || '';
      const titleB = b.name || '';
      return titleA.localeCompare(titleB);
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:3000/events', newEvent);
      setEvents([...events, response.data]);
      setNewEvent({
        title: '',
        description: '',
        start: null,
        end: null
      });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [events]);

  return (
    <div className={styles.roombooking}>
      <GroupComponent /> {/* Add GroupComponent as a toolbar at the top */}
      <div className={styles.controls}>
        <button className={styles.button} onClick={() => setShowRemovePopup(true)}>Remove Event</button>
        <button className={styles.button} onClick={handleSortEvents}>Sort Events Alphabetically</button>
      </div>
      
      {showRemovePopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <span className={styles.close} onClick={() => setShowRemovePopup(false)}>&times;</span>
            <h2>Remove Event</h2>
            <input 
              type="number" 
              value={removeId} 
              onChange={(e) => setRemoveId(e.target.value)} 
              placeholder="Enter event ID" 
            />
            <button className={styles.button} onClick={handleRemoveEvent}>Remove</button>
          </div>
        </div>
      )}

      <div className={styles.frameContainer}>
        {events.map(event => (
          <FrameComponent3
            key={event.id}
            eventId={event.id}
            name={event.name}
            description={event.description}
            location={event.location}
            participants={event.participants}
            pinterest="/image-2@2x.png"
          />
        ))}
      </div>

      {myEvents.length > 0 && (
        <div className={styles.myEventsSection}>
          <h2>My Events</h2>
          <div className={styles.frameContainer}>
            {myEvents.map(event => (
              <FrameComponent3
                key={event.id}
                eventId={event.id}
                name={event.name}
                description={event.description}
                location={event.location}
                participants={event.participants}
                pinterest="/image-2@2x.png"
              />
            ))}
          </div>
        </div>
      )}

      <div className={styles.calendarSection}>
        <h1 className={styles.calendarHeader}>Calendar</h1>
        <CalendarComponent />
        
        {/* Add Event Form */}
        <div className={styles.addEventForm}>
          <h2>Add Event</h2>
          <label>
            Title:
            <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={newEvent.description} onChange={handleInputChange} />
          </label>
          <label className={styles.dateLabel}>
            Start Date:
            <DatePicker
              selected={newEvent.start}
              onChange={(date) => setNewEvent({ ...newEvent, start: date })}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="mm/dd/yyyy --:-- --"
            />
            <FaCalendarAlt className={styles.calendarIcon} />
          </label>
          <label className={styles.dateLabel}>
            End Date:
            <DatePicker
              selected={newEvent.end}
              onChange={(date) => setNewEvent({ ...newEvent, end: date })}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="mm/dd/yyyy --:-- --"
            />
            <FaCalendarAlt className={styles.calendarIcon} />
          </label>
          <button className={styles.button} onClick={handleAddEvent}>Add Event</button>
        </div>
      </div>
    </div>
  );
};

export default RoomBooking;
