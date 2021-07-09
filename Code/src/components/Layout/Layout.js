import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
// import Dashboard from "../../pages/dashboard";
// import Typography from "../../pages/typography";
// import Notifications from "../../pages/notifications";
// import Maps from "../../pages/maps";
// import Tables from "../../pages/tables";
import FactPage from "../../pages/facts";
import AboutUsPage from "../../pages/aboutus";
import HomePage from "../../pages/home";
import FactItemPage from "../../pages/factitem";

import SignInPage from "../../pages/signin/SignIn";

// context
import { useLayoutState } from "../../context/LayoutContext";
import Claims from "../../pages/claims/Claims";
import ClaimListPage from "../../pages/claimlist";
import FactDetailsPage from "../../pages/factdetails";
import CategoryPage from "../../pages/category";

//import { Home } from "@material-ui/icons";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
           
            <Route path="/app/home/:title" component={HomePage} />
              <Route path="/app/home" component={HomePage} />              
              <Route path="/app/aboutus" component={AboutUsPage} />
              <Route path="/app/facts" component={FactPage} />              
             
              <Route path="/app/signin" component={SignInPage} />
              <Route path="/app/factdetails/:id" component={FactDetailsPage} />
             
              <Route path="/private/factitem/:id" component={FactItemPage} />
              <Route path="/private/claims/add" component={Claims} />
             
              <Route path="/private/claims/all/:id" component={ClaimListPage} />
              <Route path="/private/claims/all/" component={ClaimListPage} />
              
              <Route path="/private/category" component={CategoryPage} />
              
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
