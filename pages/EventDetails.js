import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventDetails.module.css'; // Import CSS for styling

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/event'); // Adjust URL as needed
        setEventDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Failed to fetch event details');
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="event-details">
      {eventDetails ? (
        <div>
          <h1>{eventDetails.name}</h1>
          <p><strong>Description:</strong> {eventDetails.description}</p>
          <p><strong>Location:</strong> {eventDetails.location}</p>
          <p><strong>Participants:</strong> {eventDetails.participants}</p>
          <p><strong>Date and Time:</strong> {eventDetails.date_time}</p>
          <p><strong>Type of Event:</strong> {eventDetails.event_type}</p>
        </div>
      ) : (
        <div>No event details available.</div>
      )}
    </div>
  );
};

export default EventDetails;
