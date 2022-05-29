import { makeStyles, Typography, Avatar } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { getUserReducer } from "../Registration/reducer";
const useStyles = makeStyles((theme) => {
  return {
    data: {
      flexGrow: 1,
      textAlign: "center",
      fontSize: "30px",
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

const HeaderComponent = (props) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.data}>University App</Typography>
      <Typography>{props.userData.firstName}</Typography>
      <Avatar src="/mario-av.png" className={classes.avatar} />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userData: getUserReducer(state),
  };
};
export const Header = connect(mapStateToProps)(HeaderComponent);
