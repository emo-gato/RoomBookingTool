import React, { useState } from 'react';
import { Button } from "@mui/material";
import InputFields from "../components/InputFields";
import styles from "./Frame.module.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Frame = () => {
  const navigate = useNavigate();
  
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: ''
  });

  const countryMapping = {
    "ROU": "Romania",
    "HU": "Hungary",
    "MD": "Moldova"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isValidFunction = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;
    const isEmailValid = emailRegex.test(inputs.email);
    const isPasswordValid = passwordRegex.test(inputs.password);

    console.log("Email:", inputs.email, "Email Valid:", isEmailValid);
    console.log("Password:", inputs.password, "Password Valid:", isPasswordValid);

    return isEmailValid && isPasswordValid;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) {
      console.error("No date provided or date is empty.");
      return ''; // Return empty string if undefined or incorrect format
    }

    // Split the date string by '-' if it's already in yyyy-mm-dd format
    const parts = dateStr.includes('-') ? dateStr.split('-') : dateStr.split('/');
    
    if (parts.length === 3) {
      try {
        // If the date is already in yyyy-mm-dd format, just return it
        if (dateStr.includes('-')) {
          return dateStr;
        }
        
        // Ensure that the parts are correctly formatted as numbers
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        // Check if the parts are valid numbers and not NaN
        if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
          // PadStart with '0' to ensure two digits for month and day
          return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
        } else {
          console.error("Date parts are not valid numbers:", parts);
          return '';
        }
      } catch (error) {
        console.error("Error formatting date:", error);
        return '';
      }
    } else {
      console.error("Date format is incorrect, expected mm/dd/yyyy or yyyy-mm-dd:", dateStr);
      return ''; // Return empty string if the date doesn't have exactly three parts
    }
  };

  const handleButtonClick = async (e) => {
    e.preventDefault(); 
    if (isValidFunction()) {
      const formattedDate = formatDate(inputs.dateOfBirth); // Format the date

      try {
        const userData = {
          email: inputs.email,
          password: inputs.password,
          first_name: inputs.firstName,
          last_name: inputs.lastName,
          date_of_birth: formattedDate,
          country: inputs.country
        };
        const response = await axios.post('http://localhost:3000/signup', userData);
        if (response.data.success) {
          navigate('/classroom-booking');
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('Failed to register: ' + (error.response ? error.response.data.message : "Network Error"));
      }
    } else {
      alert('Validation failed: Please check your email and password format.');
    }
  };

  return (
    <div className={styles.rectangleParent}>
      <form className={styles.rectangleGroup}>
        <h1 className={styles.createAnAccount}>Create an account</h1>
        <div className={styles.inputFieldsWrapper}>
          <InputFields inputs={inputs} handleInputChange={handleInputChange} />
        </div>
        <div className={styles.joinUsBtnWrapper}>
          <Button
            className={styles.button}
            endIcon={<img width="18px" height="18px" src="/forward.svg" />}
            disableElevation={true}
            variant="contained"
            onClick={handleButtonClick}
            sx={{
              textTransform: "none",
              color: "#fff",
              fontSize: "16",
              background: "#873a52",
              borderRadius: "4px",
              "&:hover": { background: "#873a52" },
            }}
          >
            Join us
          </Button>
        </div>
      </form>
      <img
        className={styles.i109028MeetingRoomIsometriIcon}
        loading="lazy"
        alt=""
        src="/1912i109028-meeting-room-isometric-set01-converted-1.svg"
      />
    </div>
  );
};

export default Frame;
