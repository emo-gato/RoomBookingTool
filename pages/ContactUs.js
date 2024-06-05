import React, { useState } from "react";
import FrameComponent from "../components/Frame2";
import GroupComponent from "../components/GroupComponent"; // Import the correct GroupComponent
import styles from "./ContactUs.module.css";
import emailjs from 'emailjs-com'; // Ensure emailjs is imported

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === '' || formData.email.trim() === '' || formData.message.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
  
    const templateParams = {
      to_name: 'Recipient Name', 
      from_name: formData.name,
      message: formData.message
    };
  
    // Send email using Email.js
    emailjs.send('service_abwcomt', 'template_id', templateParams, 'user_id')
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert('Message sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Error sending message. Please try again later.');
      });
  };
  
  return (
    <div className={styles.contactUs}>
      <GroupComponent /> {/* Add GroupComponent as a toolbar at the top */}
      <div className={styles.contactUsInner}>
        <FrameComponent />
      </div>
      <main className={styles.contactUsChild}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.inputField}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputField}
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className={styles.textareaField}
            contentEditable // Make the message field editable
          ></textarea>
          <button type="submit" className={styles.submitButton}>Send Message</button>
        </form>
      </main>
      <div className={styles.rectangleParent}>
        <div className={styles.frameInner} />
        <div className={styles.aboutWrapper}>
          <b className={styles.about}>About</b>
        </div>
        <div className={styles.aboutUs}>About Us</div>
        <div className={styles.ourTeam}>Our Team</div>
        <div className={styles.ourStoriesParent}>
          <div className={styles.ourStories}>Our Stories</div>
          <div className={styles.news}>News</div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
