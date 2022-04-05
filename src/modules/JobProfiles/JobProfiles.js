import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import JobCard from "../../components/JobCard";
import Layout from "../Layout/NewLayout";
import axios from "axios";
import { userServiceAPI } from "../../config/config";
import "./jobprofiles.css";

export default function JobProfiles() {
  const [usersJobInfo, setUsersJobInfo] = useState([]);
  const [userJobError, setUserJobError] = useState("");
  useEffect(() => {
    axios
      .get(`${userServiceAPI}/jobinfo`)
      .then((response) => {
        setUserJobError("");
        setUsersJobInfo(response.data.data);
        //console.log(response.data.data)
      })
      .catch((err) => {
        setUserJobError(err.response.data);
      });
  }, []);
  return (
    <Layout>
        <Grid container spacing={2} className="userContainer">
          {!userJobError &&
            usersJobInfo.map((user) =>
                <Grid item xs={4} key={user.email}>
                  {/* <NoteCard note={note} /> */}
                  <JobCard user={user} />
                </Grid>
            )}
          {userJobError && <Typography varient="body">{userJobError}</Typography>}
        </Grid>
    
    </Layout>
  );
}
