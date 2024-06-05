import React, { useState } from 'react';
import FrameComponent from './FrameComponent';

const ParentComponent = () => {
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [eventType, setEventType] = useState('');
  const [description, setDescription] = useState('');

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleParticipantsChange = (event) => {
    setParticipants(event.target.value);
  };

  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <input type="text" value={location} onChange={handleLocationChange} placeholder="Location" />
      <input type="text" value={participants} onChange={handleParticipantsChange} placeholder="Participants" />
      <input type="text" value={dateTime} onChange={handleDateTimeChange} placeholder="Date and Time" />
      <input type="text" value={eventType} onChange={handleEventTypeChange} placeholder="Event Type" />
      <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" />

      <FrameComponent
        location={location}
        participants={participants}
        dateTime={dateTime}
        eventType={eventType}
        description={description}
      />
    </div>
  );
};

export default ParentComponent;
