import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { signOut } from "../redux/actions";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function SideDrawer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.userAuthentication.isSignedIn);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    console.log(props.handleMenuToggle);
    props.handleMenuToggle(open);
  };

  const logOut = () => {
    if (isSignedIn) {
      window.gapi.auth2.getAuthInstance().signOut();
      dispatch(signOut());
    }
  };

  const loginLogout = () => {
    if (isSignedIn) {
      return (
        <List>
          <ListItem button key="Logout" onClick={logOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      );
    }
    return (
      <List>
        <ListItem button key="Login" component={Link} to="/login">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      </List>
    );
  };

  const list = () => (
    <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button key="Home" component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="Dashboard" component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="Profile" component={Link} to="/profile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Divider />
      {loginLogout()}
    </div>
  );

  return (
    <SwipeableDrawer anchor="left" open={props.open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
      {list()}
    </SwipeableDrawer>
  );
}
