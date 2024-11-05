import React, { useState, useEffect } from "react";
import axios from '../utils/api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookSession.css";

export default function BookSession() {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [sessionDate, setSessionDate] = useState(null);
  const [blockedDates, setBlockedDates] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const token = localStorage.getItem("token");
       const response = await axios.get(
        "/blocked-dates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        const blocked = response.data.map((date) => new Date(date));
        setBlockedDates(blocked);
      } catch (error) {
        console.error("Error fetching blocked dates", error);
      }
    };

    fetchBlockedDates();
  }, []);

  const handleDateChange = (date) => {
    setSessionDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !companyName || !email || !mobile || !address || !sessionDate) {
      setError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/book-session",
        {
          name,
          companyName,
          email,
          mobile,
          address,
          sessionDate: sessionDate.toISOString(),
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.message);
      setError("");
      // Reset fields after successful booking
      setName("");
      setCompanyName("");
      setEmail("");
      setMobile("");
      setAddress("");
      setSessionDate(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error booking session");
      setSuccess("");
    }
  };

  return (
    <div className="book-session-container">
      <h2>Book a Session</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sessionDate">Select Session Date</label>
          <DatePicker
            id="sessionDate"
            selected={sessionDate}
            onChange={handleDateChange}
            minDate={new Date()}
            excludeDates={blockedDates}
            placeholderText="Select a date"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Book Session
        </button>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </form>
    </div>
  );
}