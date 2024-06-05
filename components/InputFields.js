import React from 'react';
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Snackbar,
  Alert
} from "@mui/material";
import styles from "./InputFields.module.css";

const countries = [
  { code: "Romania", name: "Romania" },
  { code: "Hungary", name: "Hungary" },
  { code: "Moldova", name: "Moldova" },
];

const InputFields = ({ inputs, handleInputChange }) => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={styles.inputFields}>
      <TextField
        className={styles.inputField}
        name="email"
        placeholder="Email"
        variant="outlined"
        value={inputs.email}
        onChange={handleInputChange}
        sx={yourTextFieldStyle}
      />
      <TextField
        className={styles.inputField}
        name="password"
        placeholder="Password"
        type="password"
        variant="outlined"
        value={inputs.password}
        onChange={handleInputChange}
        sx={yourTextFieldStyle}
      />
      <TextField
        className={styles.inputField}
        name="firstName"
        placeholder="First Name"
        variant="outlined"
        value={inputs.firstName}
        onChange={handleInputChange}
        sx={yourTextFieldStyle}
      />
      <TextField
        className={styles.inputField}
        name="lastName"
        placeholder="Last Name"
        variant="outlined"
        value={inputs.lastName}
        onChange={handleInputChange}
        sx={yourTextFieldStyle}
      />
      <TextField
        className={styles.inputField}
        name="dateOfBirth"
        placeholder="Date of Birth"
        type="date"
        variant="outlined"
        value={inputs.dateOfBirth}
        onChange={handleInputChange}
        sx={yourTextFieldStyleWithPadding}
        InputLabelProps={{ shrink: true }}
      />
      <FormControl className={styles.inputField} sx={yourFormControlStyle}>
        <InputLabel>Country</InputLabel>
        <Select
          name="country"
          value={inputs.country}
          onChange={handleInputChange}
          displayEmpty
        >
          {countries.map(country => (
            <MenuItem key={country.code} value={country.name}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const yourTextFieldStyle = {
  "& fieldset": { border: "1px solid" },
  "& .MuiInputBase-root": {
    height: "35px",
    borderRadius: "4px",
  },
  "& .MuiInputBase-input": { color: "rgba(17, 17, 19, 0.6)" },
  "&.Mui-error fieldset": {
    borderColor: 'red',
  }
};

const yourTextFieldStyleWithPadding = {
  ...yourTextFieldStyle,
  "& .MuiInputBase-root": {
    paddingRight: "16px",
  },
};

const yourFormControlStyle = {
  ...yourTextFieldStyle,
  width: "100%",
  height: "34px",
  "& .MuiInputLabel-root": {
    color: "rgba(17, 17, 19, 0.6)",
  },
  "&.Mui-error .MuiInputLabel-root": {
    color: 'red',
  }
};

export default InputFields;
