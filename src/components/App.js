import React from "react";
import { connect } from "react-redux";

import AppBar from "./AppBar";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";

class App extends React.Component {
  renderContent() {
    if (this.props.isSignedIn) {
      return <Dashboard />;
    }

    return <LandingPage />;
  }

  render() {
    return (
      <div>
        <AppBar />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.userAuthentication.isSignedIn };
};

export default connect(mapStateToProps, null)(App);
