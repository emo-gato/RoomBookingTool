import GroupComponent from "../components/GroupComponent";
import FrameComponent from "../components/FrameComponent";
import styles from "./ClassroomBooking.module.css";

const ClassroomBooking = () => {
  return (
    <div className={styles.classroomBooking}>
      <GroupComponent />
      <div className={styles.classroomBookingInner}>
        <div className={styles.empowerYourEventsBookTodaParent}>
          <h1 className={styles.empowerYourEventsContainer}>
            <p className={styles.empowerYourEvents}>Empower your events.</p>
            <p className={styles.bookToday}>Book today.</p>
          </h1>
          <div className={styles.withOver100Container}>
            <span>{`With over `}</span>
            <span className={styles.span}>100</span>
            <span>{` venues to choose from, Timișoara is at your fingertips. `}</span>
          </div>
        </div>
      </div>
      <FrameComponent />
      <img
        className={styles.image1Icon}
        loading="lazy"
        alt=""
        src="/image-1@2x.png"
      />
    </div>
  );
};

export default ClassroomBooking;
