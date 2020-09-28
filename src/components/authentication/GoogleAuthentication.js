import React from "react";
import { connect } from "react-redux";

import { Button } from "@material-ui/core";

import { signIn, signOut } from "../../redux/actions";

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
          clientId: "526253080549-64b3tedvs9oqtgfseto9atnb2i5a6bcc.apps.googleusercontent.com",
          scope: "profile openid",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        })
        .catch((error) => {
          console.log(`GoogleAuthentication error: ${error}`);
        });
    });
  }

  render() {
    console.log(`render: ${this.props.isSignedIn}`);
    if (this.props.isSignedIn === null) {
      return null;
    }

    if (this.props.isSignedIn) {
      return (
        <React.Fragment>
          <Button color="inherit" onClick={this.onSignOut}>
            {this.props.signOutText}
          </Button>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Button color="inherit" onClick={this.onSignIn}>
          {this.props.signInText}
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.userAuthentication.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuthentication);
