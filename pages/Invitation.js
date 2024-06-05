import React from 'react';
import styles from "./Invitation.module.css";
import InvitationImage from "../components/Invitation.png"; // Import the image file

const Invitation = () => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = InvitationImage; // Use the imported image
        link.download = "Invitation.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.invitation}>
            <img src={InvitationImage} alt="Invitation" className={styles.fullScreenImage} />
            <button className={styles.downloadButton} onClick={handleDownload}>Download</button>
        </div>
    );
};

export default Invitation;
