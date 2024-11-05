import React, { useState } from 'react';
import axios from '../utils/api';
import { TextField, Button, Typography, IconButton, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CreateAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const errors = {};

    if (!name.match(/^[a-zA-Z\s]+$/)) {
      errors.name = 'Name can only contain letters and spaces';
    }

    if (!employeeId.match(/^[a-zA-Z0-9]+$/)) {
      errors.employeeId = 'Employee ID can only contain alphanumeric characters';
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'Invalid email format';
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem('token'); // Get token from local storage

    try {
      const response = await axios.post('/register-admin', {
        email,
        password,
        name,
        employeeId,
        role, 
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
      setEmail('');
      setPassword('');
      setName('');
      setEmployeeId('');
      setRole('');
      setErrors({});
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" component="h1">Create Admin</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Employee ID"
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
          fullWidth
          margin="normal"
          error={!!errors.employeeId}
          helperText={errors.employeeId}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
          <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            error={!!errors.role}
          >
            <MenuItem value="Hr">HR</MenuItem>
            <MenuItem value="ProjectManager">Project Manager</MenuItem>
            <MenuItem value="AdminController">Admin Controller</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={password.length > 0 && password.length < 8}
          helperText={password.length > 0 && password.length < 8 ? 'Password must be at least 8 characters' : ''}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Register
        </Button>
      </form>
      {message && <Typography variant="body1" style={{ marginTop: '16px' }}>{message}</Typography>}
    </div>
  );
};

export default CreateAdmin;
