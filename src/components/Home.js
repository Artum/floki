import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "top",
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();
  const isSignedIn = useSelector((state) => state.userAuthentication.isSignedIn);

  if (isSignedIn === null) {
    return (
    <div className={classes.root}>
      <h1>Please login to continue.</h1>
    </div>
    );
  }
  return (
    <div className={classes.root}>
      <h1>Welcome!</h1>
    </div>
  );
}
