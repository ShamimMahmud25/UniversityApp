import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
// import NoteCard from '../../components/NoteCard';
import UserCard from "../../components/UserCard";
// import Masonry from 'react-masonry-css'
import Layout from "../Layout/NewLayout";
import axios from "axios";
import { userServiceAPI, sessions } from "../../config/config";
import "./userprofile.css";

export default function UserProfile() {
  const [users, setUsers] = useState([]);
  const [userError, setUserError] = useState("");
  const [showSession, setShowSession] = useState(true);
  const [session, setSession] = useState("2015-2016");
  const handleSession = (e) => {
    setSession(e.target.value);
  };
  useEffect(() => {
    axios
      .get(`${userServiceAPI}/users`)
      .then((response) => {
        setUserError("");
        setUsers(response.data.data);
        //console.log(response.data.data)
      })
      .catch((err) => {
        setUserError(err.response.data);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSession(false);
  };
  return (
    <Layout>
      {!showSession && (
        <Grid container spacing={2} className="userContainer">
          {!userError &&
            users.map((user) =>
              user.session === session ? (
                <Grid item xs={4} key={user.email}>
                  {/* <NoteCard note={note} /> */}
                  <UserCard user={user} />
                </Grid>
              ) : null
            )}
          {userError && <Typography varient="body">{userError}</Typography>}
        </Grid>
      )}
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
