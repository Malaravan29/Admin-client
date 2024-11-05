import React, { useState } from "react";
import axios from "../utils/api";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // States for Manual Mapping and Object Disinfection
  const [manualMapping, setManualMapping] = useState("disabled");
  const [objectDisinfection, setObjectDisinfection] = useState("disabled");

  const [IPAddress, setIPAddress] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [primaryContactName, setPrimaryContactName] = useState("");
  const [primaryContactEmail, setPrimaryContactEmail] = useState("");
  const [primaryContactPhoneNumber, setPrimaryContactPhoneNumber] =
    useState("");
  const [locations, setLocations] = useState([
    { name: "", address: "", subLocations: [{ name: "", address: "" }] },
  ]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLocationChange = (index, event) => {
    const newLocations = [...locations];
    newLocations[index][event.target.name] = event.target.value;
    setLocations(newLocations);
  };

  const handleSubLocationChange = (locationIndex, subLocationIndex, event) => {
    const newLocations = [...locations];
    newLocations[locationIndex].subLocations[subLocationIndex][
      event.target.name
    ] = event.target.value;
    setLocations(newLocations);
  };

  const addLocation = () => {
    setLocations([
      ...locations,
      { name: "", address: "", subLocations: [{ name: "", address: "" }] },
    ]);
  };

  const addSubLocation = (locationIndex) => {
    const newLocations = [...locations];
    newLocations[locationIndex].subLocations.push({ name: "", address: "" });
    setLocations(newLocations);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Valid email is required";
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber))
      newErrors.phoneNumber = "Valid phone number is required (10 digits)";

    if (!manualMapping) newErrors.manualMapping = "Manual Mapping is required";
    if (!objectDisinfection)
      newErrors.objectDisinfection = "Automatic Disinfection is required";

    if (
      !IPAddress ||
      !/^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/.test(
        IPAddress
      )
    )
      newErrors.IPAddress = "Valid IP address is required (e.g., 192.168.0.1)";
    if (!organizationName)
      newErrors.organizationName = "Organization name is required";
    if (!password || password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";
    if (!primaryContactName)
      newErrors.primaryContactName = "Primary contact name is required";
    if (!primaryContactEmail || !/\S+@\S+\.\S+/.test(primaryContactEmail))
      newErrors.primaryContactEmail = "Valid primary contact email is required";
    if (
      !primaryContactPhoneNumber ||
      !/^\d{10}$/.test(primaryContactPhoneNumber)
    )
      newErrors.primaryContactPhoneNumber =
        "Valid primary contact phone number is required (10 digits)";
    locations.forEach((location, index) => {
      if (!location.name)
        newErrors[`locationName${index}`] = `Location ${
          index + 1
        } name is required`;
      if (!location.address)
        newErrors[`locationAddress${index}`] = `Location ${
          index + 1
        } address is required`;
      location.subLocations.forEach((subLocation, subIndex) => {
        if (!subLocation.name)
          newErrors[`subLocationName${index}-${subIndex}`] = `Sub-Location ${
            subIndex + 1
          } name is required`;
        if (!subLocation.address)
          newErrors[`subLocationAddress${index}-${subIndex}`] = `Sub-Location ${
            subIndex + 1
          } address is required`;
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFields()) return; // Prevent submission if validation fails

    const token = localStorage.getItem("token"); // Get token from local storage

    try {
      const response = await axios.post(
        "/register-user",
        {
          name,
          email,
          phoneNumber,
          manualMapping,
          objectDisinfection,
          IPAddress,
          organizationName,
          password,
          primaryContact: {
            name: primaryContactName,
            email: primaryContactEmail,
            phoneNumber: primaryContactPhoneNumber,
          },
          locations,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setSnackbarOpen(true); // Open the Snackbar

      // Reset form fields
      setName("");
      setEmail("");
      setPhoneNumber("");

      setManualMapping("disabled");
      setObjectDisinfection("disabled");

      setIPAddress("");
      setOrganizationName("");
      setPassword("");
      setPrimaryContactName("");
      setPrimaryContactEmail("");
      setPrimaryContactPhoneNumber("");
      setLocations([
        { name: "", address: "", subLocations: [{ name: "", address: "" }] },
      ]);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setSnackbarOpen(true); // Open the Snackbar
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <Typography variant="h4" component="h1">
        Create User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          fullWidth
          margin="normal"
        />
        <TextField
          label="IP Address"
          type="text"
          value={IPAddress}
          onChange={(e) => setIPAddress(e.target.value)}
          error={!!errors.IPAddress}
          helperText={errors.IPAddress}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Organization Name"
          type="text"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          error={!!errors.organizationName}
          helperText={errors.organizationName}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Primary Contact Name"
          type="text"
          value={primaryContactName}
          onChange={(e) => setPrimaryContactName(e.target.value)}
          error={!!errors.primaryContactName}
          helperText={errors.primaryContactName}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Primary Contact Email"
          type="email"
          value={primaryContactEmail}
          onChange={(e) => setPrimaryContactEmail(e.target.value)}
          error={!!errors.primaryContactEmail}
          helperText={errors.primaryContactEmail}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Primary Contact Phone Number"
          type="text"
          value={primaryContactPhoneNumber}
          onChange={(e) => setPrimaryContactPhoneNumber(e.target.value)}
          error={!!errors.primaryContactPhoneNumber}
          helperText={errors.primaryContactPhoneNumber}
          fullWidth
          margin="normal"
        />
        {locations.map((location, index) => (
          <div key={index}>
            <TextField
              label={`Location ${index + 1} Name`}
              name="name"
              value={location.name}
              onChange={(e) => handleLocationChange(index, e)}
              error={!!errors[`locationName${index}`]}
              helperText={errors[`locationName${index}`]}
              fullWidth
              margin="normal"
            />
            <TextField
              label={`Location ${index + 1} Address`}
              name="address"
              value={location.address}
              onChange={(e) => handleLocationChange(index, e)}
              error={!!errors[`locationAddress${index}`]}
              helperText={errors[`locationAddress${index}`]}
              fullWidth
              margin="normal"
            />
            {location.subLocations.map((subLocation, subIndex) => (
              <div key={subIndex}>
                <TextField
                  label={`Sub-Location ${subIndex + 1} Name`}
                  name="name"
                  value={subLocation.name}
                  onChange={(e) => handleSubLocationChange(index, subIndex, e)}
                  error={!!errors[`subLocationName${index}-${subIndex}`]}
                  helperText={errors[`subLocationName${index}-${subIndex}`]}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={`Sub-Location ${subIndex + 1} Address`}
                  name="address"
                  value={subLocation.address}
                  onChange={(e) => handleSubLocationChange(index, subIndex, e)}
                  error={!!errors[`subLocationAddress${index}-${subIndex}`]}
                  helperText={errors[`subLocationAddress${index}-${subIndex}`]}
                  fullWidth
                  margin="normal"
                />
              </div>
            ))}
            <Button
              variant="contained"
              onClick={() => addSubLocation(index)}
              style={{ marginTop: "8px" }}
            >
              Add Sub-Location
            </Button>
          </div>
        ))}
        <Button
          variant="contained"
          onClick={addLocation}
          style={{ marginTop: "16px" }}
        >
          Add Location
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Register
        </Button>
      </form>

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={message}
      />
    </div>
  );
};

export default CreateUser;
