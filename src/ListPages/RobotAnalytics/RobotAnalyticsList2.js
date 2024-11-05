
import React, { useState, useEffect } from "react";
import axios from "../../utils/api";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Alert,
} from "@mui/material";

const RobotAnalytics = () => {
  const { encodedEmail } = useParams();
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const decodedEmail = atob(decodeURIComponent(encodedEmail));

  useEffect(() => {
    // Fetch the robot analytics data by emailId
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(`/analytics/${decodedEmail}`);
        setAnalyticsData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching robot analytics data.");
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [decodedEmail]);

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

  if (error)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Robot Analytics for {decodedEmail}
      </Typography>
      {analyticsData.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No analytics data found for this email.
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {analyticsData.map((analytics) => (
            <Grid item xs={12} sm={6} md={4} key={analytics._id}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Robot ID: {analytics.robotId}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Model: {analytics.model}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Battery Percentage: {analytics.batteryPercentage}%
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Date: {new Date(analytics.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle1">Battery Running Time</Typography>
                  <Typography variant="body2">
                    Start: {analytics.analytics.batteryRunningTime.startingTime}
                  </Typography>
                  <Typography variant="body2">
                    End: {analytics.analytics.batteryRunningTime.endingTime}
                  </Typography>
                  <Typography variant="subtitle1">Motor Running Time</Typography>
                  <Typography variant="body2">
                    Start: {analytics.analytics.motorRunningTime.startingTime}
                  </Typography>
                  <Typography variant="body2">
                    End: {analytics.analytics.motorRunningTime.endingTime}
                  </Typography>
                  <Typography variant="subtitle1">UV Light Running Time</Typography>
                  <Typography variant="body2">
                    Start: {analytics.analytics.uvLightRunningTime.startingTime}
                  </Typography>
                  <Typography variant="body2">
                    End: {analytics.analytics.uvLightRunningTime.endingTime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RobotAnalytics;
