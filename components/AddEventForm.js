import React, { useState } from 'react';
import axios from 'axios';

const AddEventForm = ({ onEventAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { title, description, start, end };
    await axios.post('http://localhost:3000/events', newEvent);
    onEventAdded();
    setTitle('');
    setDescription('');
    setStart('');
    setEnd('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="datetime-local"
          value={start}
          onChange={e => setStart(e.target.value)}
        />
      </div>
      <div>
        <label>End Date</label>
        <input
          type="datetime-local"
          value={end}
          onChange={e => setEnd(e.target.value)}
        />
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEventForm;
