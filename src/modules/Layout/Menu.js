import React from "react";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { SubjectOutlined } from "@material-ui/icons";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useHistory, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    typo: {
      color: "#000",
      background: "#fff",
    },
    toolbar: {
      marginTop: "150px",
    },
    data: {
      flexGrow: 1,
      textAlign: "center",
      fontSize: "40px",
      height: "150px",
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});
export default function Menu() {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const menuItems = [
    {
      text: "Home",
      icon: <SubjectOutlined color="secondary" />,
      path: "/home",
    },
    {
      text: "People",
      icon: <SupervisorAccountOutlinedIcon color="secondary" />,
      path: "/userProfile",
    },
    {
      text: "SendMail",
      icon: <MailOutlineIcon color="secondary" />,
      path: "/sendmail",
    },
    {
      text: "ResetPassword",
      icon: <VpnKeyIcon color="secondary" />,
      path: "/resetpassword",
    },
    {
      text: "Logout",
      icon: <LogoutIcon color="secondary" />,
      path: "/signup",
    },
  ];
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.drawPaper }}
    >
      <div>
        <Typography variant="h5" className={classes.title}>
          University App
        </Typography>
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => history.push(item.path)}
            className={location.pathname === item.path ? classes.active : null}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
