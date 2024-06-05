import React, { useMemo } from "react";
import { Button } from "@mui/material";
import styles from "./PropertyCardBig.module.css";

const PropertyCardBig = ({
  rectangle12,
  driverName,
  text,
  text1,
  text2,
  propTop,
  propHeight,
  onSendInvitation,
  onJoinEvent
}) => {
  const propertyCardBig2Style = useMemo(() => ({ top: propTop }), [propTop]);
  const textStyle = useMemo(() => ({ height: propHeight }), [propHeight]);

  const handleInvitationClick = () => {
    onSendInvitation({ name: driverName, description: text });
  };

  const handleJoinEventClick = () => {
    if (onJoinEvent) { // Ensure onJoinEvent is not undefined before calling it
      onJoinEvent({ name: driverName });
    } else {
      console.error("onJoinEvent function is not defined.");
    }
  };

  return (
    <div className={styles.propertyCardBig2} style={propertyCardBig2Style}>
      <img className={styles.propertyCardBig2Child} alt="" src={rectangle12} />
      <div className={styles.driverNameParent}>
        <div className={styles.driverName}>{driverName}</div>
        <div className={styles.frameParent}>
          <div className={styles.groupParent}>
            <img className={styles.groupIcon} alt="" src="/group.svg" />
            <div className={styles.text} style={textStyle}>
              {text}
            </div>
          </div>
          <div className={styles.text1}>{text1}</div>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.text2}>{text2}</div>
        </div>
        <div className={styles.frameChild} />

        {/* Send Invitation Button */}
        <Button
          variant="contained"
          className={styles.sendInvitationButton}
          onClick={handleInvitationClick}
        >
          Send Invitation
        </Button>

        {/* Join Event Button */}
        <Button
          variant="contained"
          className={styles.joinEventButton}
          onClick={handleJoinEventClick}
        >
          Join Event
        </Button>
      </div>
    </div>
  );
};

export default PropertyCardBig;
