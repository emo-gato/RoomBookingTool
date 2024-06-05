import { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import styles from "./LoginContainer.module.css";
import { Tooltip } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginContainer = () => {
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;
  
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleCreateAccountClick = () => {
    navigate('/Frame'); 
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(!emailRegex.test(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(!passwordRegex.test(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      console.log("Validation errors");
      return;
    }

    try {
      console.log("Submitting login request with email:", email, "and password:", password);
      const response = await axios.post('http://localhost:3000/login', {
        email: email,
        password: password
      });    

      console.log("Login response:", response.data);

      if (response.data.success) {
        navigate('/auditorium-rental'); 
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error);
      alert("An error occurred while logging in: " + (error.response ? error.response.data.message : "Network Error"));
    }  
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContainerChild} />
      <section className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <h1 className={styles.login}>Login</h1>
        <div className={styles.notAMemberContainer}>
          <span className={styles.notAMember}>Not a member?</span>
          <span>
            {` `}
            <span className={styles.createAnAccount} onClick={handleCreateAccountClick}>Create an account.</span>
          </span>
        </div>
        <form className={styles.frameParent} onSubmit={handleSubmit}>
          <div className={styles.inputFieldParent}>
            <Tooltip
              title="Please enter a valid email address"
              open={emailError && email.length > 0}
              placement="right"
            >
              <TextField
                className={styles.inputField}
                placeholder="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                sx={{
                  "& fieldset": { borderColor: emailError ? "red" : "rgba(17, 17, 19, 0.2)" },
                  "& .MuiInputBase-root": { height: "48px" },
                  "& .MuiInputBase-input": { color: "#111113" },
                }}
              />
            </Tooltip>
            <Tooltip
              title="Password must contain at least 8 characters, including at least one letter and one number"
              open={passwordError && password.length > 0}
              placement="right"
            >
              <TextField
                className={styles.inputField}
                placeholder="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        className={styles.eyeShowIcon}
                        alt="Show Password"
                        src="/eye-show.svg"
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& fieldset": { borderColor: passwordError ? "red" : "rgba(17, 17, 19, 0.2)" },
                  "& .MuiInputBase-root": { height: "48px" },
                  "& .MuiInputBase-input": { color: "#111113" },
                }}
              />
            </Tooltip>
          </div>
          <Button
            className={styles.frameItem}
            endIcon={<img width="11.7px" height="11.4px" src="/union.svg" />}
            disableElevation={true}
            variant="contained"
            sx={{
              textTransform: "none",
              color: "#e4e4e4",
              fontSize: "16",
              background: "linear-gradient(90deg, #b35f78, #874056)",
              borderRadius: "10px",
              "&:hover": {
                background: "linear-gradient(90deg, #b35f78, #874056)",
              },
              height: 48,
            }}
            type="submit"
            disabled={emailError || passwordError}
          >
            Sign in
          </Button>
        </form>
        <img
          className={styles.calendar1Icon}
          loading="lazy"
          alt=""
          src="/calendar-1.svg"
        />
      </section>
    </div>
  );
};

export default LoginContainer;
