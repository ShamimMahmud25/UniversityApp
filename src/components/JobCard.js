import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { blue, green, pink, yellow, orange } from "@material-ui/core/colors";
const useStyles = makeStyles({
  avatar: {
    backgroundColor: (user) => {
      if (user.companyName[0] === "R") {
        return yellow[700];
      }
      if (user.companyName[0] === "S") {
        return green[500];
      }
      if (user.companyName[0] === "T") {
        return pink[500];
      }
      if (user.companyName[0] === "J") {
        return orange[500];
      }
      return blue[500];
    },
  },
  adviceText :{
      marginTop:'20px',
      fontWeight:"bold",
      fontStyle:"italic",
      color:"black"
  }
});

export default function JobCard({ user }) {
  const classes = useStyles(user);
  return (
    <>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {user.companyName[0].toUpperCase()}
            </Avatar>
          }
          title={`${user.jobRole} at ${user.companyName}`}
          subheader={`Joined : ${user.joinDate}`}
        />
        <CardContent>
          <Typography variant="body2" >
            {`Name: ${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography variant="body2" >
            {`Email: ${user.email}`}
          </Typography>
          <Typography variant="body2">
            {`session : ${user.session}`}
          </Typography>
          <Typography variant="body2" className={classes.adviceText}>
            {`"${user.adviceText}"`}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
