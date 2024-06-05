
import React, { useState } from 'react';
import AuditoriumRental from './AuditoriumRental';
import FrameComponent from "../components/FrameComponent";
const HigherLevelParentComponent = () => {
  const [lastAddedEvent, setLastAddedEvent] = useState(null);

  const handleAddEvent = (eventDetails) => {
    setLastAddedEvent(eventDetails);
  };

  return (
    <div>
      <AuditoriumRental onAddEvent={handleAddEvent} />
      {/* Other components */}
    </div>
  );
};

export default HigherLevelParentComponent;
