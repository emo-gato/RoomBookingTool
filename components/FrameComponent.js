import React, { useState, useEffect } from 'react';
import styles from "./FrameComponent.module.css";
import axios from 'axios';

const FrameComponent = () => {
  const [latestEventName, setLatestEventName] = useState('');

  useEffect(() => {
    const fetchLatestEventName = async () => {
      try {
        const response = await axios.get('http://localhost:3000/latest');
        if (response.status === 200) {
          setLatestEventName(response.data.name);
        } else {
          setLatestEventName('');
        }
      } catch (error) {
        console.error('Error fetching latest event name:', error);
        setLatestEventName('');
      }
    };

    fetchLatestEventName();
  }, []);

  return (
    <section className={styles.classroomBookingInner}>
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <div className={styles.frameParent}>
          <div className={styles.pinFillParent}>
            <img
              className={styles.pinFillIcon}
              loading="lazy"
              alt=""
              src="/pin-fill@2x.png"
            />
            <div className={styles.locationWrapper}>
              <div className={styles.location}>Location</div>
            </div>
          </div>
          <div className={styles.westUniversityParent}>
            <div className={styles.westUniversity}>{latestEventName ? latestEventName : 'West University TM'}</div>
            <div className={styles.timioara}>Timișoara</div>
          </div>
        </div>
        <div className={styles.frameGroup}>
        <div className={styles.frameContainer}>
            <div className={styles.userFillParent}>
              <img
                className={styles.userFillIcon}
                loading="lazy"
                alt=""
                src="/user-fill.svg"
              />
              <div className={styles.participantsWrapper}>
                <div className={styles.participants}>Participants</div>
              </div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.frameDiv}>
                <div className={styles.peopleWrapper}>
                  <div className={styles.people}>23 People</div>
                </div>
                <div className={styles.awaitingConfirmation}>
                  4 awaiting confirmation
                </div>
              </div>
            </div>
          </div>
          <div className={styles.frameParent1}>
            <div className={styles.exportFillParent}>
              <img
                className={styles.exportFillIcon}
                loading="lazy"
                alt=""
                src="/export-fill@2x.png"
              />
              <div className={styles.dateAndTimeWrapper}>
                <div className={styles.dateAndTime}>Date and Time</div>
              </div>
            </div>
            <div className={styles.frameWrapper1}>
              <div className={styles.march10AmParent}>
                <div className={styles.march10Am}>2 March, 10 AM</div>
                <div className={styles.selectDate}>Select date</div>
              </div>
            </div>
          </div>
          <div className={styles.frameParent2}>
            <div className={styles.frameParent3}>
              <div className={styles.fiRrThumbtackWrapper}>
                <img
                  className={styles.fiRrThumbtackIcon}
                  loading="lazy"
                  alt=""
                  src="/firrthumbtack.svg"
                />
              </div>
              <div className={styles.typeOfEventWrapper}>
                <div className={styles.typeOfEvent}>Type of Event</div>
              </div>
            </div>
            <div className={styles.webinarParent}>
              <div className={styles.webinar}>Webinar</div>
              <div className={styles.operatingSystemsIntroduction}>
                Operating Systems Introduction
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent;
