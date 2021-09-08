import React from "react";

import { useForm } from "react-hook-form";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  divider: {
    padding: theme.spacing(3),
  },
  buttonArea: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  icon: {
    padding: theme.spacing(1),
  },
}));

const Register = () => {
  const { handleSubmit, register } = useForm();

  const classes = useStyles();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container className={classes.container} maxWidth="xs">
      <div>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth inputRef={register} label="Email" name="email" size="small" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    inputRef={register}
                    label="Password"
                    name="password"
                    size="small"
                    type="password"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" fullWidth type="submit" variant="contained">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
