import React ,{ useState, Component }  from "react";
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


export default class Category extends Component {

  
  constructor(props){
    super(props)
    this.state = {
      isLoading : false,
      categories : [],
      classes : useStyles,
      isLoading : false,
      setIsLoading: false,
      error: null,
      setError : null,
      formData : {
        name : '',
        
      }
    }
    
  }
  onSave = () => {
    axios.post("http://localhost:5000/category/add",{  
    category_name : this.state.formData.name,   
    })
    .then(response => { 
      console.log(response)
      this.setState({
        formData : {         
          name : ''
        }
      })

      axios.get("http://localhost:5000/category")
      .then(response => { 
        console.log(response)
        this.setState({
          categories: response.data,
        });
    })
    .catch(error => console.log(error.response));
    
  })
  .catch(error => console.log(error.response));
  }

  componentWillMount(){
    
    this.setState({
      isLoading : true,

    })
    //API
    axios.get("http://localhost:5000/category")
      .then(response => { 
        console.log(response)
        this.setState({
          categories: response.data,
        });
    })
    .catch(error => console.log(error.response));
     
  }

  render(){
    const { formData } = this.state;
    return (
      <>
      <PageTitle title="Add Category"/>
      <Grid container spacing={4}>
            <Grid item lg={6} md={4} sm={6} xs={1}>
              <Widget
                disableWidgetMenu
                upperTitle
                bodyClass={this.state.classes.fullHeightBody}
                className={this.state.classes.card}
              >
Existing Categories : 
<ul>
  {this.state.categories.map((team) => <li>{team.category_name}</li> )}
</ul>
   <form className={this.state.classes.root}  autoComplete="off">
      <div className={this.state.classes.formContainer}>
          <div className={this.state.classes.form}>
          <Fade in={this.state.error}>
                  <Typography color="secondary" className={this.state.classes.errorMessage}>
                    Something is wrong 
                  </Typography>
                </Fade>
                <TextField
                  id="name"
                  InputProps={{
                    classes: {
                      underline: this.state.classes.textFieldUnderline,
                      input: this.state.classes.textField,
                    },
                  }}
                  value={this.state.formData.name}
                  onChange={e => {
                    this.setState({
                      formData : {
                        ...formData,
                        name : e.target.value
                      }
                    })
                  }}
                  margin="normal"
                  placeholder="Name"
                  type="text"
                  fullWidth
                />
                
               <div className={this.state.classes.formButtons}>
                 
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"                   
                    onClick={this.onSave}
                  >
                    Submit Category
                  </Button>
                </div>
          </div>
      </div>
  
           
           </form>
           
          </Widget>
            </Grid>
            </Grid> 
            </>    
    )
  }
  
}
