import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  InputBase,
  Menu,
  MenuItem,
  Fab,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import { Badge, Typography } from "../Wrappers/Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";
// context

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut , useUserState } from "../../context/UserContext";

export default function Header(props) {
  var classes = useStyles();
  var { isAuthenticated } = useUserState();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();

  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [isMailsUnread, setIsMailsUnread] = useState(true);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);
  
  
  return (!isAuthenticated ? (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>

        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Fact check
        </Typography>
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => toggleSidebar(layoutDispatch)}
        >
          Browse 
        </Button>
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          href="#/app/facts"
        >
          Items to Factcheck
        </Button>
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          href= "#/app/aboutus"
        >
          About Us
        </Button>
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          href="#/app/signin"
        >
         Sign Up
        </Button>      
      </Toolbar>
    </AppBar>
  ) : ( 
    
  

    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
       

        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Fact check
        </Typography>
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => toggleSidebar(layoutDispatch)}
        >
          Browse 
        </Button>
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          href="/app/home/Health"
         // onClick={() => signOut(userDispatch, props.history)}
        >
          Home 
        </Button>
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          href="#/private/claims/Add"
        >
          Submit Claims
        </Button>
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          href= "#/private/claims/All"
        >
          List Of Claims
        </Button>
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          href= "#/private/category"
        >
          Categories
        </Button>
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => signOut(userDispatch, props.history)}
        >
         Logout
        </Button>      
      </Toolbar>
    </AppBar>

   ) );
}
