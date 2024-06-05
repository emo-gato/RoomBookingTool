import React, { useState } from "react";
import styles from "./Frame2.module.css";
import emailjs from "emailjs-com";

const FrameComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
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
    
    console.log('Form Data:', formData);
    
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      to_name: formData.firstName,
      reply_to: formData.email,
      message: formData.message
    };
  
    console.log('Template Parameters:', templateParams);
    
    emailjs.send("service_abwcomt", "template_luo4hfq", templateParams, "NR4tmWGdPbm-E55Ad")
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert('Message sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        alert('Error sending message. Please try again later.');
      });
  };
  

  return (
    <div className={styles.dinnerParent}>
      <div className={styles.dinner}>
        <div className={styles.writeUsAMessageParent}>
          <h1 className={styles.writeUsA}>Write us a message!</h1>
          <div className={styles.ifYouWant}>
            If you want to make suggestions or if you have any questions, please
            fill out the form and we’ll respond shortly!
          </div>
        </div>
        <div className={styles.frameParent}>
          <div className={styles.frameGroup}>
            <div className={styles.frameWrapper}>
              <img
                className={styles.frameChild}
                loading="lazy"
                alt=""
                src="/group-3893.svg"
              />
            </div>
            <b className={styles.universitateaDeVestContainer}>
              <p className={styles.universitateaDeVest}>
                Universitatea de Vest Timișoara
              </p>
            </b>
          </div>
          <div className={styles.sendbuttoncircle}>
            <div className={styles.nounPhone36125701Parent}>
              <img
                className={styles.nounPhone36125701Icon}
                loading="lazy"
                alt=""
                src="/noun-phone-3612570-1.svg"
              />
              <b className={styles.b}>+40773976807</b>
            </div>
            <div className={styles.nounEmail2475641Parent}>
              <img
                className={styles.nounEmail2475641Icon}
                loading="lazy"
                alt=""
                src="/noun-email-247564-1.svg"
              />
              <b className={styles.mirunaspineanu003gmailcom}>
                miruna.spineanu003@gmail.com
              </b>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.emailForm}>
        <div className={styles.frameContainer}>
          <div className={styles.frameDiv}>
            <div className={styles.rectangleParent}>
              <div className={styles.frameItem} />
              <input
                className={styles.firstName}
                placeholder="First Name*"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.rectangleGroup}>
              <div className={styles.frameInner} />
              <input
                className={styles.lastName}
                placeholder="Last Name*"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.component2}>
            <div className={styles.component2Child} />
            <input
              className={styles.email}
              placeholder="Email*"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.rectangleContainer}>
            <div className={styles.rectangleDiv} />
            <input
              className={styles.phoneNumber}
              placeholder="Phone Number*"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className={styles.component4}>
            <div className={styles.component4Child} />
            <textarea
              className={styles.yourMessage}
              placeholder="Your message..."
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <img className={styles.component4Item} alt="" />
            <img className={styles.component4Inner} loading="lazy" alt="" />
          </div>
        </div>
        <div className={styles.emailFormInner}>
          <button className={styles.groupButton} onClick={handleSubmit}>
            <div className={styles.frameChild1} />
            <div className={styles.send}>Send</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
