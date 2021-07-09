import React ,{ useState,Component } from "react";
import axios from 'axios';
import {
  Button,
  
  TextField,
  Select,
  Grid,
  CircularProgress,
 
  Tabs,
  Tab,
  MenuItem,
  Fade,
  FormControl,
  InputLabel
  
} from "@material-ui/core";

import * as Icons from "@material-ui/icons"

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


export default class ClaimList extends Component {

  constructor(props){
    super(props)
    this.state = {
      isLoading : false,
      categories : [],
      claims : [],
      classes : useStyles,
      isLoading : false,
      setIsLoading: false,
      error: null,
      setError : null,
      formData : {
        name : '',
        claim: '',
        categoryid: ''
      }
    }
    
  }
 
  componentWillReceiveProps(nextProp) {
    console.log("Pop Received" + JSON.stringify(nextProp));
    const categoryId  = nextProp.match.params.id;
    if(categoryId !== undefined){
      axios.get(`http://localhost:5000/claim/category/${categoryId}`)
        .then(response => { 
          console.log(response)
          if(response.data != undefined){
            this.setState({
              claims :  response.data ,
            });
          }
        })
        .catch(error =>{ console.log(error.response);
        
        
        });     
    }
 
  }

  componentWillMount(){
    console.log("Pop Received" + JSON.stringify(this.props));
    const categoryId  = this.props.match.params.id;

    this.setState({
      isLoading : true,
    })

    console.log("categoryId : " + categoryId);
    if(categoryId === undefined){

      axios.get("http://localhost:5000/claim")
      .then(response => { 
        console.log(response)
        this.setState({
          claims : response.data,
        });
      })
      .catch(error => console.log(error.response));     
    

    }else
    {

      axios.get(`http://localhost:5000/claim/category/${categoryId}`)
      .then(response => { 
        console.log("Category Response " + JSON.stringify(response.data));
        console.log("this " + this);
        if(response.data != undefined){
          this.setState({
            claims :  response.data ,
          });
        }
      })
      .catch(error => console.log(error));     

    }

    //API
    axios.get("http://localhost:5000/category")
      .then(response => { 
        console.log(response)
        this.setState({
          categories: response.data,
        });
    })
    .catch(error => console.log(error.response));     

    
   


      ///byCategory/:id

      //if(this.props.pa)
  



  }

  
  render (){
  
        return (
          <>
          
          <PageTitle title="All Claims"/>

          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={4} xs={4}>

            <Widget
                    upperTitle
                    bodyClass={this.state.classesfullHeightBody}
                    className={this.state.classescard}
                    disableWidgetMenu
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                        <Grid item xs={12} md={6}>
                          <List component="nav" aria-label="secondary mailbox folders">       
                          {
                            this.state.categories.map((team) =>  <ListItemLink href={"#/private/claims/All/" + team._id } > <ListItemText primary={team.category_name} /></ListItemLink> )
                          }
                          </List> 
                        </Grid>
                      </Grid>
              </Widget>

            </Grid>
            <Grid item lg={9} md={9} sm={8} xs={8}>

            { 
              
              this.state.claims.map((claimItem) =>


                <Grid item lg={12} md={4} sm={6} xs={1}>
                      <Widget
                        upperTitle
                        bodyClass={this.state.classesfullHeightBody}
                        className={this.state.classescard}
                        disableWidgetMenu
                      >
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                        >
                          <Grid item xs={12} md={6}>
                            <Typography variant="h4" className={this.state.classestext}>
                                  {claimItem.name}
                            </Typography>
                            <Typography className={this.state.classestext}>
                                {claimItem.description}
                            </Typography>
                            <Typography className={this.state.classestext}>
                                Source: {claimItem.source}
                            </Typography>
                          </Grid>
                          
                          
                                <Grid
                                  className={this.state.classesmaterailIcon}
                                  item
                                  md={3}
                                  lg={3}
                                  sm={3}
                                  xs={12}
                                >
                                  <Button
                                    classes={{ root: this.state.classesbutton }}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    href={ "#/private/factitem/" + claimItem._id }
                                  >
                                      Fact Check
                                    </Button>

                                </Grid>
                        </Grid>
                      </Widget>
                    </Grid>
            ) 
                    
            }
        

            </Grid>
          </Grid>

          </>
    )
  }
}
