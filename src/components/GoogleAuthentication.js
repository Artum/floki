import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import { signIn, signOut } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const styles = (theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  divider: {
    padding: theme.spacing(3),
  },
  buttonArea: {
    justifyContent: "center",
    display: "flex",
    flexGrow: 1,
  },
  icon: {
    padding: theme.spacing(1),
  },
});

class GoogleAuthentication extends React.Component {
  onSignIn = () => {
    try {
      const auth = window.gapi.auth2.getAuthInstance();
      auth.signIn();
    } catch (error) {
      console.log(`GoogleAuthentication on sign-in error: ${error}`);
    }
  };

  onSignOut = () => {
    try {
      const auth = window.gapi.auth2.getAuthInstance();
      auth.signOut();
    } catch (error) {
      console.log(`GoogleAuthentication on sign-out error: ${error}`);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Button color="primary" fullWidth variant="contained" onClick={this.onSignIn}>
          <i className={classes.icon}>
            <FontAwesomeIcon icon={faGoogle} />
          </i>
          Sign in with Google
        </Button>
      </React.Fragment>
    );
  }
}

export default connect(null, { signIn, signOut })(withStyles(styles)(GoogleAuthentication));
