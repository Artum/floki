import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    alignItems: "stretch",
    justifyContent: "stretch",
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <h1>Dashboard</h1>
    </div>
  );
}
