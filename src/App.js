import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";

import {Dashboard, DocumentPreview, Home, LogIn, Register, UserProfile} from "./pages/index";
import PrivateRoute from "./components/PrivateRoute";
import SideDrawer from "./components/SideDrawer";
import TopBar from "./components/TopBar";

import { initializeApplication, signIn, signOut } from "./redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    display: "flex",
    padding: theme.spacing(3),
    alignItems: "start",
    height: "95%",
    justifyContent: "start",
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
        <PrivateRoute path="/document/preview/:document_id">
          <DocumentPreview />
        </PrivateRoute>
        <Route path="/register">
          <Register />
        </Route>
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

  return <CircularProgress style={{ marginLeft: "50%", marginTop: "25%" }}></CircularProgress>;
}
