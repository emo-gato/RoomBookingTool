import styles from "./Group3.module.css";

const GroupComponent = () => {
  return (
    <section className={styles.frameParent}>
      <img className={styles.frameChild} alt="" src="/group-2.svg" />
      <div className={styles.frameGroup}>
        <div className={styles.officialEventInvitationWrapper}>
          <b className={styles.officialEventInvitation}>
            Official Event Invitation
          </b>
        </div>
        <div className={styles.frameContainer}>
          <div className={styles.mainNameWrapper}>
            <h1 className={styles.mainName}>OPENING DAY</h1>
          </div>
          <div className={styles.frameDiv}>
            <div className={styles.mainNameContainer}>
              <b className={styles.mainName1}>14.10.2024</b>
            </div>
            <div
              className={styles.youAreOfficially}
            >{`You are officially invited to my event taking place at The University. `}</div>
          </div>
        </div>
      </div>
      <div className={styles.organizerWebsiteParent}>
        <b className={styles.organizerWebsite}>www.website.com</b>
        <b className={styles.phoneNumber}>+00 123 123 123</b>
      </div>
    </section>
  );
};

export default GroupComponent;
s