import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    alignItems: "stretch",
    justifyContent: "stretch",
  },
}));

export default function Home() {
  const classes = useStyles();
  const isSignedIn = useSelector((state) => state.userAuthentication.isSignedIn);

  if (isSignedIn === null) {
    return (
    <div className={classes.content}>
      <h1>Please login to continue.</h1>
    </div>
    );
  }
  return (
    <div className={classes.content}>
      <h1>Welcome!</h1>
    </div>
  );
}
