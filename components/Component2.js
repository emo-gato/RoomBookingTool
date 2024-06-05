import styles from "./Component2.module.css";

const GroupComponent = () => {
  return (
    <footer className={styles.rectangleParent}>
      <div className={styles.frameChild} />
      <div className={styles.moralizer2021TemplateBySofParent}>
        <div className={styles.moralizer2021Template}>
          © Moralizer 2021 Template by Softwareseni
        </div>
        <div className={styles.mealtimeHeadingWrapper}>
          <div className={styles.mealtimeHeading} />
        </div>
      </div>
      <div className={styles.termsWrapper}>
        <div className={styles.terms}>Terms</div>
      </div>
      <div className={styles.privacyWrapper}>
        <div className={styles.privacy}>Privacy</div>
      </div>
    </footer>
  );
};

export default GroupComponent;
