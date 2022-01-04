import React from "react";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  message: {
    marginTop: 200,
    marginLeft:450,
    fontSize:'30px',
    display: "block",
    width:'400px',
    backgroundColor:'#FF0000'
  },
});

export default function Forgetpassword() {
  const classes = useStyles();

  return <div className={classes.message}>I din dot complete this work yet</div>;
}
