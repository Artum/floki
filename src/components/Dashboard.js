import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    alignItems: "stretch",
    justifyContent: "stretch",
  },
  paper: {
    height: 140,
    width: 100,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Typography variant="h1" component="h2" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid item xs={12}>
        <Grid container justifyContent="left" spacing={spacing}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
            <Grid key={value} item>
              <Paper className={classes.paper} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
