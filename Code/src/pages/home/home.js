import React, { useState,Component } from "react";
import axios from 'axios';
import {
  TextField,
  Grid,
  Button,
  ListItem,
  Link,
} from "@material-ui/core";


//import { withRouter } from "react-router-dom";
import classnames from "classnames";

import * as Icons from "@material-ui/icons"

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";


// icons sets
import "font-awesome/css/font-awesome.min.css"; 


export default class HomePage extends Component {

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
      },
      searchText : '',
      categoryid : '',
      categoryName:'',
      counter: 0,
    }
    
  }

  componentWillReceiveProps(nextProps){

    const catId = nextProps.match.params.title;

    this.setState({
      isLoading : true,
      categoryid :catId
    })

    axios.get(`http://localhost:5000/claim/facts/category/${catId}`)
    .then(response => { 
      console.log(response);
      if(response.data !== undefined && response.data != null){
      this.setState({
        claims : response.data,
      });
    }else{
      this.setState({
        claims : [],
      });
    }
    })
    .catch(error => console.log(error.response));     


    axios.get(`http://localhost:5000/category/${catId}`)
    .then(response => { 
      console.log(response)
      if(response.data !== undefined && response.data != null){
        this.setState({
          categoryName: response.data.category_name,
        });
      }
    })
    .catch(error => console.log(error.response));  

  }

  componentWillMount(){
    
    const catId = this.props.match.params.title;

    if(catId != undefined || catId != null){
        this.setState({
          isLoading : true,
          categoryid : catId
        })
        
        if(catId !== undefined){
            axios.get(`http://localhost:5000/claim/facts/category/${catId}`)
            .then(response => { 
              console.log(response)
              if(response.data !== undefined && response.data != null){
              this.setState({
                claims : response.data,
              });
            }else{
              this.setState({
                claims : [],
              });
            }
            })
            .catch(error => console.log(error.response));     

          }else{

            axios.get(`http://localhost:5000/claim/facts`)
            .then(response => { 
              console.log(response)
              if(response.data !== undefined && response.data != null){
              this.setState({
                claims : response.data,
              });
            }else{
              this.setState({
                claims : [],
              });
            }
            })

          }


        axios.get(`http://localhost:5000/category/${catId}`)
        .then(response => { 
          console.log(response)
          if(response.data !== undefined && response.data != null){
          this.setState({
            categoryName: response.data.category_name,
          });
        }
        })
        .catch(error => console.log(error.response));     
  }

  }


  componentWillLoad(){
    const catId = this.props.match.params.title;
    let counter = this.state.counter;

    if(catId != undefined || catId != null){
      axios(`http://localhost:3000/#/app/home/${catId}`);
      counter = counter ++;
      console.log("Counter:",this.state.counter)
    }
  }


  // increasecounter = () => {
  //   this.setState({counter: this.state.counter + 1}, () => {
  //       console.log("Counter:",this.state.counter)
  //   });
  // }
  

  // increasecounter = () => {
  //   let counter = this.state.counter
  //   counter = counter + 1
  //   this.setState({counter: counter})
  //   console.log("counter:", counter);
  // }
  
  onSearch = () =>{

    axios.post('http://localhost:5000/claim/search',{ search : this.state.searchText })
    .then(response => { 
      console.log(response)
      this.setState({
        claims : response.data,
      });
    })
    .catch(error => console.log(error.response));     


  }

  
  render(){

  return (
    <>
          <Grid container>
<Grid item lg={11} md={11} sm={12} xs={12}>

        <TextField
          id="search"
          fullWidth
          InputProps={{
            classes: {
              underline: this.state.classes.textFieldUnderline,
              input: this.state.classes.textField,
             
            },
          }}
          margin="normal"
          placeholder="Search here"
          type="text"
          value = {this.state.searchText}
          onChange={e => {
            this.setState({
                searchText : e.target.value
            })
          }}
        />

</Grid>
<Grid item lg={1} md={1} sm={12} xs={12} >


        <Button
          classes={{ root: ["pull-right"]}}
          variant="contained"
          size="medium"
          color="primary"
          onClick = {this.onSearch}
        >
          Search
        </Button>
        </Grid>
        </Grid>
        
      
    <PageTitle title={this.state.categoryName} />

      <Grid container spacing={4}>
        
              

            {
               (this.state.claims.length > 0 || ( this.state.categoryid !=null && this.state.categoryid.length  > 0)) > 0 ? ( 
              
              this.state.claims.map((claimItem) => 
              <Grid item lg={10} md={4} sm={6} xs={1}>
              <Widget
                upperTitle
                bodyClass={this.state.classes.fullHeightBody}
                className={this.state.classes.card}
                disableWidgetMenu
              >
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                        >
                          <Grid item xs={12} md={6}>
                          <Link href={"#/app/factdetails/" + claimItem._id } color="inherit" className={this.state.classes.link} >
                            <Typography variant="h4" className={this.state.classes.text} onClick={this.increasecounter}>
                              {claimItem.name}
                            </Typography> 
                          </Link>
                            <Typography className={this.state.classes.text}>
                                {claimItem.description}                            
                            </Typography>
                          
                          </Grid>

                          {/* <Grid
                            className={this.state.classes.materailIcon}
                            item
                            md={3}
                            lg={2}
                            sm={4}
                            xs={12}
                          >
                            <Icons.Check className="success"/>
                            <Typography className={this.state.classes.materialIconText} color="success">
                              Approved
                            </Typography>
                          </Grid> */}
                        </Grid>
                        </Widget>
          </Grid>
          
              ) ) : (

                <Grid item lg={12} md={4} sm={6} xs={1}>
                <Widget
                  upperTitle
                  bodyClass={this.state.classes.fullHeightBody}
                  className={this.state.classes.card}
                  disableWidgetMenu
                >

Welcome to this Community-based Fact Checking Website


                  </Widget>
                  </Grid>

              )}
 
        
 
   
    </Grid>
  </>
)
        }
}
