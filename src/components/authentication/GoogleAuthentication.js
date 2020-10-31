import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import { signIn, signOut } from "../../redux/actions";
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
  onAuthChange = (isSignedIn) => {
    console.log(`onAuthChange: ${isSignedIn}`);
    if (isSignedIn) {
      const profile = this.auth.currentUser.get().getBasicProfile();
      this.props.signIn(
        "google",
        {
          userId: profile.getId(),
          email: profile.getEmail(),
          firstName: profile.getGivenName(),
          lastName: profile.getFamilyName(),
          fullName: profile.getName(),
          imageUrl: profile.getImageUrl(),
        },
        this.auth.currentUser.get().getAuthResponse()
      );
    } else {
      this.props.signOut();
    }
  };

  onSignIn = () => {
    try {
      this.auth.signIn();
    } catch (error) {
      console.log(`GoogleAuthentication on sign-in error: ${error}`);
    }
  };

  onSignOut = () => {
    try {
      this.auth.signOut();
    } catch (error) {
      console.log(`GoogleAuthentication on sign-out error: ${error}`);
    }
  };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: "email profile openid",
        })
        .then(
          () => {
            this.auth = window.gapi.auth2.getAuthInstance();

            this.auth.isSignedIn.listen(this.onAuthChange);
            this.onAuthChange(this.auth.isSignedIn.get());
          },
          (error) => {
            console.log(`GoogleAuthentication error: ${error}`);
          }
        );
    });
  }

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
