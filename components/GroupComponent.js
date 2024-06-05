import React from 'react';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import styles from "./GroupComponent.module.css";

const GroupComponent = () => {
  const navigate = useNavigate();  

  const handleLogoutClick = () => {
    navigate('/');
  };

  const handleReservationsClick = () => {
    navigate('/auditorium-rental');
  };

  const handleAboutClick = () => {
    navigate('/classroom-booking');
  };

  const handleContactClick = () => {
    navigate('/contact-us');
  };

  const handleAddEventClick = () => {
    navigate('/room-booking');
  };

  return (
    <header className={styles.rectangleParent}>
        <div className={styles.frameItem} />
      <div className={styles.frameParent}>
        <button className={styles.groupButton} onClick={handleAboutClick}>
          <div className={styles.frameInner} />
          <div className={styles.digitalInvitation}>About</div>
        </button>
        <button className={styles.groupButton} onClick={handleReservationsClick}>
          <div className={styles.rectangleDiv} />
          <div className={styles.myReservations}>Events</div>
        </button>
        <button className={styles.groupButton} onClick={handleContactClick}>
          <div className={styles.rectangleDiv} />
          <div className={styles.myReservations}>Contact</div>
        </button>
        <button className={styles.groupButton} onClick={handleAddEventClick}>
          <div className={styles.rectangleDiv} />
          <div className={styles.myReservations}>Add Event</div>
        </button>
        <Button
          className={styles.frameChild1}
          disableElevation={true}
          variant="contained"
          onClick={handleLogoutClick}
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: "16px",
            background: "#db7192",
            borderRadius: "11px",
            padding: "px 20px", // Adjust padding to increase height
            height: "45x", // Set a specific height
            "&:hover": { background: "#663947" },
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default GroupComponent;
