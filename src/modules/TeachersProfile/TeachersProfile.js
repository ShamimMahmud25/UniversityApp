import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import TeacherCard from "../../components/TeacherCard";
import Layout from "../Layout/NewLayout";
import axios from "axios";
import { userServiceAPI } from "../../config/config";
import "./teachers.css";

export default function TeachersProfile() {
  const [teachersInfo, setTeachersInfo] = useState([]);
  const [teachersError, setTeachersError] = useState("");
  useEffect(() => {
    axios
      .get(`${userServiceAPI}/users`)
      .then((response) => {
        setTeachersError("");
        setTeachersInfo(response.data.data);
        //console.log(response.data.data)
      })
      .catch((err) => {
        setTeachersError(err.response.data);
      });
  }, []);
  return (
    <Layout>
      <Grid container spacing={2} className="userContainer">
        {!teachersError &&
          teachersInfo.map((user) =>
            user.userType === "Teacher" ? (
              <Grid item xs={4} key={user.email}>
                {/* <NoteCard note={note} /> */}
                <TeacherCard user={user} />
              </Grid>
            ) : (
              ""
            )
          )}
        {teachersError && (
          <Typography varient="body">{teachersError}</Typography>
        )}
      </Grid>
    </Layout>
  );
}
