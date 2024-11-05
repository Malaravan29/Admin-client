import React, { useState, useEffect } from "react";
import axios from '../../utils/api';
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Container,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import "./loadingStyles.css";

const UsersDetailsList = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    phoneNumber: "",
    IPAddress:"",
    primaryContact: {
      name: "",
      email: "",
      phoneNumber: "",
      organizationName: "",
    },
    locations: [],
  });

  // Decode the email
  const decodeEmail = (encodedEmail) => {
    return atob(decodeURIComponent(encodedEmail)); // Base64 decode the email
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const decodedEmail = decodeEmail(email);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `/user-details/${decodedEmail}`,
          {
            headers: {
              Authorization:`Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        setUpdatedDetails(response.data); // Initialize updatedDetails with current user details
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user");
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  const handleUpdateDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/user-details/${user._id}/updateDetails`,
        updatedDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(updatedDetails); // Update user state with the new details
      setOpenDialog(false);
    } catch (err) {
      console.error("Error updating user details:", err);
      setError("Failed to update user details");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePrimaryContactChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      primaryContact: {
        ...prevDetails.primaryContact,
        [name]: value,
      },
    }));
  };

  const handleLocationChange = (index, e) => {
    const { name, value } = e.target;
    const newLocations = [...updatedDetails.locations];
    newLocations[index][name] = value;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      locations: newLocations,
    }));
  };

  const handleSubLocationChange = (locIndex, subLocIndex, e) => {
    const { name, value } = e.target;
    const newLocations = [...updatedDetails.locations];
    newLocations[locIndex].subLocations[subLocIndex][name] = value;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      locations: newLocations,
    }));
  };

  const addLocation = () => {
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      locations: [
        ...prevDetails.locations,
        { name: "", address: "", subLocations: [] },
      ],
    }));
  };

  const removeLocation = (index) => {
    const newLocations = [...updatedDetails.locations];
    newLocations.splice(index, 1);
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      locations: newLocations,
    }));
  };

  const addSubLocation = (locIndex) => {
    const newLocations = [...updatedDetails.locations];
    newLocations[locIndex].subLocations.push({ name: "", address: "" });
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      locations: newLocations,
    }));
  };

  const removeSubLocation = (locIndex, subLocIndex) => {
    const newLocations = [...updatedDetails.locations];
    newLocations[locIndex].subLocations.splice(subLocIndex, 1);
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      locations: newLocations,
    }));
  };

  if (loading) {
    return (
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>Loading</span>
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom >
        User Name: {user.name}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" style={{ marginTop: "20px", textAlign: 'left' }}>
            Basic Information;
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Name: {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone Number: {user.phoneNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            IPAddress: {user.IPAddress}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Organization Name: {user.organizationName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Is First Time: {user.isFirstTime ? "Yes" : "No"}
          </Typography>

          <Typography variant="h6" component="h2" style={{ marginTop: "20px", textAlign: 'left' }}>
            App Permessions;
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Manual Mapping: {user.manualMapping}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Object Disinfection: {user.objectDisinfection}
          </Typography>

          <Typography variant="h6" component="h2" style={{ marginTop: "20px", textAlign: 'left'  }}>
            Primary Contact;
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Name: {user.primaryContact.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {user.primaryContact.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone Number: {user.primaryContact.phoneNumber}
          </Typography>
          <Typography variant="h6" component="h2" style={{ marginTop: "20px", textAlign: 'left'  }}>
            Locations;
          </Typography>
          {user.locations.map((location, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <Typography variant="body2" color="text.secondary">
                Location Name: {location.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location Address: {location.address}
              </Typography>
              {location.subLocations.map((subLocation, subIndex) => (
                <div
                  key={subIndex}
                  style={{ marginBottom: "16px", marginLeft: "20px" }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Sub-Location Name: {subLocation.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sub-Location Address: {subLocation.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created At: {new Date(user.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Updated At: {new Date(user.updatedAt).toLocaleString()}
                  </Typography>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ margin: "8px" }}
          onClick={() => setOpenDialog(true)}
        >
          Update Details
        </Button>
      </Card>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Update Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={updatedDetails.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            name="phoneNumber"
            value={updatedDetails.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="IP Address"
            type="text"
            fullWidth
            name="IPAddress"
            value={updatedDetails.IPAddress}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Organization Name"
            type="text"
            fullWidth
            name="organizationName"
            value={updatedDetails.organizationName}
            onChange={handleChange}
          />
          <Typography variant="h6" component="h3" style={{ marginTop: "20px" }}>
            Primary Contact
          </Typography>
          <TextField
            margin="dense"
            label="Primary Contact Name"
            type="text"
            fullWidth
            name="name"
            value={updatedDetails.primaryContact.name}
            onChange={handlePrimaryContactChange}
          />
          <TextField
            margin="dense"
            label="Primary Contact Email"
            type="email"
            fullWidth
            name="email"
            value={updatedDetails.primaryContact.email}
            onChange={handlePrimaryContactChange}
          />
          <TextField
            margin="dense"
            label="Primary Contact Phone Number"
            type="text"
            fullWidth
            name="phoneNumber"
            value={updatedDetails.primaryContact.phoneNumber}
            onChange={handlePrimaryContactChange}
          />
          <Typography variant="h6" component="h3" style={{ marginTop: "20px" }}>
            Locations
          </Typography>
          {updatedDetails.locations.map((location, locIndex) => (
            <div key={locIndex} style={{ marginBottom: "16px" }}>
              <TextField
                margin="dense"
                label="Location Name"
                type="text"
                fullWidth
                name="name"
                value={location.name}
                onChange={(e) => handleLocationChange(locIndex, e)}
              />
              <TextField
                margin="dense"
                label="Location Address"
                type="text"
                fullWidth
                name="address"
                value={location.address}
                onChange={(e) => handleLocationChange(locIndex, e)}
              />
              <IconButton
                aria-label="remove"
                onClick={() => removeLocation(locIndex)}
                size="small"
                color="secondary"
              >
                <RemoveIcon />
              </IconButton>
              {location.subLocations.map((subLocation, subLocIndex) => (
                <div
                  key={subLocIndex}
                  style={{ marginBottom: "16px", marginLeft: "20px" }}
                >
                  <TextField
                    margin="dense"
                    label="Sub-Location Name"
                    type="text"
                    fullWidth
                    name="name"
                    value={subLocation.name}
                    onChange={(e) =>
                      handleSubLocationChange(locIndex, subLocIndex, e)
                    }
                  />
                  <TextField
                    margin="dense"
                    label="Sub-Location Address"
                    type="text"
                    fullWidth
                    name="address"
                    value={subLocation.address}
                    onChange={(e) =>
                      handleSubLocationChange(locIndex, subLocIndex, e)
                    }
                  />
                  <IconButton
                    aria-label="remove"
                    onClick={() => removeSubLocation(locIndex, subLocIndex)}
                    size="small"
                    color="secondary"
                  >
                    <RemoveIcon />
                  </IconButton>
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => addSubLocation(locIndex)}
              >
                Add Sub-Location
              </Button>
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={addLocation}
          >
            Add Location
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateDetails} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UsersDetailsList;
