import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children, ...rest }) {
  const isSignedIn = useSelector((state) => state.userAuthentication.isSignedIn);
  console.log(`PrivateRoute: isSignedIn=${isSignedIn}`);

  if (isSignedIn === null) {
    return null;
  }
  return (
    <React.Fragment>
      <Route
        {...rest}
        render={({ location }) =>
          isSignedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          )
        }
      />
    </React.Fragment>
  );
}
