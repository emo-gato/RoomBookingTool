import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import PropTypes from "prop-types";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { DateRangePicker, StaticDateRangePicker } from '@mui/lab';
import { TextField, Button } from '@mui/material';
import styles from "./Card.module.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Meeting with Customer A",
    start: new Date(2023, 4, 1, 10, 0), // Months are 0-indexed
    end: new Date(2023, 4, 1, 11, 0),
  },
  {
    title: "Demo for Customer B",
    start: new Date(2023, 4, 2, 14, 0),
    end: new Date(2023, 4, 2, 15, 0),
  },
  // Add more events as needed
];

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    let mDate = toolbar.date;
    let newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
    toolbar.onNavigate('PREV', newDate);
  };

  const goToNext = () => {
    let mDate = toolbar.date;
    let newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
    toolbar.onNavigate('NEXT', newDate);
  };

  const goToCurrent = () => {
    let now = new Date();
    toolbar.onNavigate('TODAY', now);
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span>
        <b>{date.format('MMMM')}</b>
        <span> {date.format('YYYY')}</span>
      </span>
    );
  };

  return (
    <div className={styles.toolbar}>
      <button onClick={goToBack}>Back</button>
      <button onClick={goToCurrent}>Today</button>
      <button onClick={goToNext}>Next</button>
      <span className={styles.label}>{label()}</span>
    </div>
  );
};

const Card = ({ className = "" }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [view, setView] = useState('calendar'); // 'calendar' or 'details'
  const [eventDetails, setEventDetails] = useState({ title: '', description: '' });

  const handleDateRangeChange = (newValue) => {
    setStartDate(newValue[0]);
    setEndDate(newValue[1]);
  };

  const handleEventDetailsChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveEvent = () => {
    // Logic to save event details can be added here
    setView('calendar');
  };

  const selectedEvents = events.map((event) => {
    if (startDate && endDate && moment(event.start).isBetween(startDate, endDate, null, '[]')) {
      return { ...event, color: 'lightpink' };
    }
    return event;
  });

  const customEventStyle = (event) => {
    if (event.color) {
      return { style: { backgroundColor: event.color } };
    }
    return {};
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <section className={[styles.card, className].join(" ")}>
        {view === 'calendar' ? (
          <>
            <div className={styles.leftWrapper}>
              <div className={styles.left}>
                <div className={styles.top}>
                  <div className={styles.container}>
                    <div className={styles.infos}>
                      <div className={styles.title}>
                        <div className={styles.title1}>Reservation Page</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.description}>
                    This is an example of a meeting you would have with a potential
                    customer to demonstrate your product.
                  </div>
                </div>
                <div className={styles.bottom}>
                </div>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.cardInner}>
              <div className={styles.frameParent}>
                <div className={styles.titleWrapper}>
                  <div className={styles.title2}>{`Select a Date & Time`}</div>
                </div>
                <div className={styles.dateRangePicker}>
                  <StaticDateRangePicker
                    displayStaticWrapperAs="desktop"
                    value={[startDate, endDate]}
                    onChange={handleDateRangeChange}
                    renderInput={(startProps, endProps) => (
                      <>
                        <TextField {...startProps} />
                        <TextField {...endProps} />
                      </>
                    )}
                  />
                </div>
                <div className={styles.calendarContainer}>
                  <Calendar
                    localizer={localizer}
                    events={selectedEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600, width: '100%' }}
                    components={{
                      toolbar: CustomToolbar
                    }}
                    eventPropGetter={customEventStyle}
                    onSelectSlot={() => setView('details')}
                    selectable
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.eventDetails}>
            <TextField
              label="Event Title"
              name="title"
              value={eventDetails.title}
              onChange={handleEventDetailsChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Event Description"
              name="description"
              value={eventDetails.description}
              onChange={handleEventDetailsChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSaveEvent}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setView('calendar')}>
              Back to Calendar
            </Button>
          </div>
        )}
      </section>
    </LocalizationProvider>
  );
};

Card.propTypes = {
  className: PropTypes.string,
};

export default Card;
