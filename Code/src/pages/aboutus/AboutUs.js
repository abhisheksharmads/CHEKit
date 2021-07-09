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

export default function AboutUs() {
  var classes = useStyles();

  return (
    <>
        
    <PageTitle title="About Us"/>
    <pr>This is a community-based Fact-Checking website which has been developed for my final project at University of Glasgow.</pr>
    </>
  );
}
