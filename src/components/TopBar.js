import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button } from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  loginButton: {
    backgroundColor: "#FFF",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "#FFF",
    },
  },
}));

export default function TopBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.userAuthentication.isSignedIn);
  console.log(`PrivateRoute: isSignedIn=${isSignedIn}`);

  const onLoginClick = () => {
    history.push("/login");
  };

  const onProfileClick = () => {
    history.push("/profile");
  };

  const loginOrProfile = () => {
    if (isSignedIn) {
      return (
        <Button color="inherit" onClick={onProfileClick}>
          <PersonIcon></PersonIcon>
        </Button>
      );
    }

    if (isSignedIn === null) {
      return null;
    }

    return (
      <Button color="inherit" onClick={onLoginClick}>
        Login
      </Button>
    );
  };

  return (
    <div className={classes.appBar}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Floki
          </Typography>
          {loginOrProfile()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
