import React, { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    MenuItem,
    TextField,
    Button,
  } from "@material-ui/core";
import JobCard from "../../components/JobCard";
import Layout from "../Layout/NewLayout";
import axios from "axios";
import { userServiceAPI,sessions} from "../../config/config";
import "./jobprofiles.css";

export default function JobProfiles() {
  const [usersJobInfo, setUsersJobInfo] = useState([]);
  const [userJobError, setUserJobError] = useState("");
  const [showSession, setShowSession] = useState(true);
  const [session, setSession] = useState("2015-2016");
  useEffect(() => {
    axios
      .get(`${userServiceAPI}/jobinfo`)
      .then((response) => {
        setUserJobError("");
        setUsersJobInfo(response.data.data);
      })
      .catch((err) => {
        setUserJobError(err.response.data);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSession(false);
  };
  const handleSession = (e) => {
    setSession(e.target.value);
  };
  return (
    <Layout>
     { !showSession && ( <Grid container spacing={2} className="userContainer">
        {!userJobError &&
          usersJobInfo.map((user) =>
            user.session === session ? (
              <Grid item xs={4} key={user.email}>
                <JobCard user={user} />
              </Grid>
            ) : (
              ""
            )
          )}
        {userJobError && <Typography varient="body">{userJobError}</Typography>}
      </Grid>)}
      {showSession && (
        <form
          noValidate
          autoCapitalize="off"
          className="formContainer"
          onSubmit={handleSubmit}
        >
          <Grid>
            <TextField
              label="Session"
              select
              value={session}
              onChange={handleSession}
              size="small"
              fullWidth
              variant="outlined"
            >
              {sessions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disableElevation
            >
              Search
            </Button>
          </Grid>
        </form>
      )}
    </Layout>
  );
}
