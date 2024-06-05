import React from 'react';
import FrameComponent from './FrameComponent'; // Import FrameComponent
import styles from './RoomsContent.module.css';

const RoomsContent = ({ events }) => {
  return (
    <div className={styles.roomsContent}>
      {events.map(event => (
        <FrameComponent
          key={event.id}
          pinterest="/path/to/image.jpg" // Use appropriate image path
          name={event.name}
          description={event.description}
          location={event.location}
          propPadding="20px"
          propWidth="100%"
          propMinWidth="200px"
          propPadding1="10px"
          propMinWidth1="100px"
        />
      ))}
    </div>
  );
};

export default RoomsContent;
