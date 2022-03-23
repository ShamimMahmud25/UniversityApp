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
      if (user.firstName[0] === "R") {
        return yellow[700];
      }
      if (user.firstName[0] === "S") {
        return green[500];
      }
      if (user.firstName[0] === "T") {
        return pink[500];
      }
      if (user.firstName[0] === "J") {
        return orange[500];
      }
      return blue[500];
    },
  },
});

export default function NoteCard({ user }) {
  const classes = useStyles(user);
  return (
    <>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {user.firstName[0].toUpperCase()}
            </Avatar>
          }
          title={`${user.firstName} ${user.lastName}`}
          subheader={user.session}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {`email: ${user.email}`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`mobile : ${user.mobile}`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`address : ${user.address}`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`studentID: ${user.studentID}`}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
