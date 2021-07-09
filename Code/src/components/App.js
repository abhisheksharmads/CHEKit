import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import SignIn from "../pages/signin";
import ClaimsPage from "../pages/claims";

// context
import { useUserState } from "../context/UserContext";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <HashRouter>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app" />} />
      <Route
        exact
        path="/app"
        render={() => <Redirect to="/app/home" />}
      />
      
      <PrivateRoute exact path="/private/claims" component={Layout} />      
      <PrivateRoute exact path="/private/claims/add" component={Layout} />      
      <PrivateRoute exact path="/private/category" component={Layout} />      
      
      <PrivateRoute path="/private/claims/all/:id" component={Layout} /> 
      <PrivateRoute path="/private/claims/all" component={Layout} />   
      <PrivateRoute path="/private/factitem/:id" component={Layout} />  
      <PublicRoute path="/app/signin" component={Layout} />
      <Route path="/app" component={Layout} />
      <Route component={Error} />
      
    </Switch>
  </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/app/signin",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/private/claims/all",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}