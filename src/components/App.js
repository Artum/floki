import React from "react";

import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dashboard from "./Dashboard";
import Home from "./Home";
import UserProfile from "./UserProfile";
import PrivateRoute from "./PrivateRoute";
import SideDrawer from "./SideDrawer";
import TopBar from "./TopBar";
import LogIn from "./LogIn";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    display: "flex",
    flexGrow: 1,
    padding: theme.spacing(3),
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

  const [open, setOpen] = React.useState(false);
  const handleMenuOpen = () => {
    setOpen(true);
  };
  const handleMenuToggle = (open) => setOpen(open);

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
        <Route path="/login">
          <LogIn />
        </Route>
      </Switch>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideDrawer open={open} handleMenuToggle={handleMenuToggle} />
      <TopBar onMenuClick={handleMenuOpen} />
      <div className={classes.content}>{mainContent()}</div>
    </div>
  );
}
