import {
  makeStyles,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar
} from "@material-ui/core";
import { AddCircleOutlined,SubjectOutlined } from "@material-ui/icons";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
// import { format } from "date-fns";
const drawerWidth = 240;
const useStyles = makeStyles((theme)=>{
    return {
        page: {
            background: "#f9f9f9",
            width: "100%",
            padding: theme.spacing(3)
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
          title:{
              padding:theme.spacing(2)
          },
          appbar:{
            width: `calc(100% - ${drawerWidth}px)`
          },
          typo:{
            color:'#000',
            background:'#fff'
          },
          toolbar:{
            marginTop:'150px'
          },
          data:{
            flexGrow:1,
            textAlign:"center",
            fontSize:'40px',
            height:'150px'
          },
          avatar:{
            marginLeft:theme.spacing(2)
          }
    }

});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const menuItems = [
    {
      text: "Home",
      icon: <SubjectOutlined color="secondary" />,
      path: "/home",
    },
    {
      text: "Create Notes",
      icon: <AddCircleOutlined color="secondary" />,
      path: "/create",
    },
    {
      text: "Logout",
      icon: <LogoutIcon color="secondary" />,
      path: "/",
    }
 
  ];
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.typo}>
          <Typography className={classes.data}>
               Welcome To CollegeSpace
          </Typography>
          <Typography>
            Shamim
          </Typography>
          <Avatar src='/mario-av.png' className={classes.avatar}/>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            My Collage
          </Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
