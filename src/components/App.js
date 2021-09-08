import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";

import Dashboard from "./Dashboard";
import Home from "./Home";
import UserProfile from "./UserProfile";
import PrivateRoute from "./PrivateRoute";
import SideDrawer from "./SideDrawer";
import TopBar from "./TopBar";
import LogIn from "./LogIn";
import Register from "./Register";

import { initializeApplication, signIn, signOut } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    display: "flex",
    padding: theme.spacing(3),
    alignItems: "center",
    height: "95%",
    justifyContent: "center",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

export default function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.userAuthentication.isSignedIn);

  const isReady = useSelector((state) => state.application.isReady);
  useEffect(() => {
    const onAuthChange = (toSignIn) => {
      console.log(`onAuthChange: ${toSignIn}`);
      if (toSignIn) {
        dispatch(signIn());
      } else {
        dispatch(signOut());
      }
    };
    dispatch(initializeApplication(onAuthChange));
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const handleMenuOpen = () => {
    setOpen(true);
  };
  const handleMenuToggle = (open) => setOpen(open);

  const loginRoute = () => {
    if (isSignedIn === false) {
      return (
        <Route path="/login">
          <LogIn />
        </Route>
      );
    }
    return null;
  };

  const mainContent = () => {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute path="/profile">
          <UserProfile />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/register">
          <Register />
        </PrivateRoute>
        {loginRoute()}
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  };

  if (isReady) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <SideDrawer open={open} handleMenuToggle={handleMenuToggle} />
        <TopBar onMenuClick={handleMenuOpen} />
        <div className={classes.content}>{mainContent()}</div>
      </div>
    );
  }

  return <CircularProgress style={{ marginLeft: "50%", marginTop: "50%" }}></CircularProgress>;
}
