import React from "react";
import {
  Button,
  Grid,
  TextField,
} from "@material-ui/core";

import * as Icons from "@material-ui/icons"

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";

export default function Facts() {
  var classes = useStyles();

  return (
    <>
        
    <PageTitle title="Claims"/>
    <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Widget
           
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                To help to check claims or to add claims please
              </Typography>
              
            </div>
            <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          href="#/app/signin"
        >
         Sign Up
        </Button>  
          </Widget>
        </Grid>

        </Grid>

    

    </>
  );
}
