import React, { useMemo, useState, useEffect } from 'react';
import styles from "./FrameComponent3.module.css";
import emailjs from 'emailjs-com';

const FrameComponent3 = ({
  pinterest,
  name,
  description,
  location,
  participants,
  eventId,
  propPadding,
  propWidth,
  propMinWidth,
  propPadding1,
  propMinWidth1,
}) => {
  const [joined, setJoined] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  useEffect(() => {
    const joinedEvents = JSON.parse(localStorage.getItem('joinedEvents')) || [];
    setJoined(joinedEvents.includes(eventId));
  }, [eventId]);

  const handleJoinClick = () => {
    if (!joined) {
      const joinedEvents = JSON.parse(localStorage.getItem('joinedEvents')) || [];
      joinedEvents.push(eventId);
      localStorage.setItem('joinedEvents', JSON.stringify(joinedEvents));
      setJoined(true);
      sendEmail('join');
    }
  };

  const handleUnjoinClick = () => {
    if (joined) {
      let joinedEvents = JSON.parse(localStorage.getItem('joinedEvents')) || [];
      joinedEvents = joinedEvents.filter(id => id !== eventId);
      localStorage.setItem('joinedEvents', JSON.stringify(joinedEvents));
      setJoined(false);
      sendEmail('unjoin');
    }
  };

  const sendEmail = (action) => {
    const templateParams = {
      to_email: 'mirunat.spineanu@yahoo.com',
      from_name: 'Miruna',
      message_html: action === 'join' ? `You have joined the event: ${name}` : `You have unjoined the event: ${name}`,
    };

    emailjs.send('service_abwcomt', 'template_a36ln2y', templateParams, 'NR4tmWGdPbm-E55Ad')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      }, (error) => {
        console.error('Email failed to send!', error);
      });
  };

  const frameDivStyle = useMemo(() => {
    return {
      padding: propPadding,
      width: propWidth,
      minWidth: propMinWidth,
    };
  }, [propPadding, propWidth, propMinWidth]);

  const frameDiv1Style = useMemo(() => {
    return {
      padding: propPadding1,
    };
  }, [propPadding1]);

  const fREEStyle = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  const renderDialogueBox = () => {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={() => setShowDialogue(false)}>&times;</span>
          <h2>Event Details</h2>
          <p>Name: {name}</p>
          <p>Description: {description}</p>
          <p>Location: {location}</p>
          <p>Participants: {participants}</p>
          {!joined ? (
            <button onClick={handleJoinClick}>Join</button>
          ) : (
            <button onClick={handleUnjoinClick}>Unjoin</button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.frameWrapper} style={frameDivStyle}>
      <div className={styles.pinterestParent} style={frameDiv1Style}>
        <img
          className={styles.pinterestIcon}
          loading="lazy"
          alt=""
          src={pinterest}
        />
        <div className={styles.bulevardulVasilePrvan4TiParent}>
          <div className={styles.bulevardulVasilePrvan}>{location}</div>
          <div className={styles.free} style={fREEStyle}>
            {name}
          </div>
          <img
            className={styles.frameChild}
            loading="lazy"
            alt=""
            src={description}
          />
          <div className={styles.detailsButtonWrapper}>
            <div className={styles.istockphotoxremovebgpreview}>
              <div className={styles.mirunaSpineanu}>Miruna Spineanu</div>
            </div>
            <button className={styles.groupButton} onClick={() => setShowDialogue(true)}>
              {joined ? 'Joined' : 'Details'}
            </button>
          </div>
        </div>
      </div>
      {showDialogue && renderDialogueBox()}
    </div>
  );
};

export default FrameComponent3;
