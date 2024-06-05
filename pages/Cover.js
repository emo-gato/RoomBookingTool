import Card from "../components/Card";
import styles from "./Cover.module.css";

const Cover = () => {
  return (
    <div className={styles.cover}>
      <b className={styles.checkAvailability}>Check Availability</b>
      <Card />
    </div>
  );
};

export default Cover;
