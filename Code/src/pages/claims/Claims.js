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


export default class Claims extends Component {

  
  constructor(props){
    super(props)
    this.state = {
      isLoading : false,
      categories : [],
      classes : useStyles,
      isLoading : false,
      setIsLoading: false,
      error: null,
      success : null,
      setError : null,
      formData : {
        name : '',
        claim: '',
        categoryid: ''
      },
      name : '',
      claim : '',
      categoryId: '',
    }
    
  }
  onSave = () => {
    axios.post("http://localhost:5000/claim/add",{  name : this.state.formData.name,
    description : this.state.formData.claim,   
    category :  this.state.formData.categoryid,
    source : this.state.formData.source,
    user_id : window.localStorage.getItem('id_token'),
     })
    .then(response => { 
      console.log(response);
      this.setState({
        formData : {
        
          name : '',
          categoryid: '',
          claim : '',
          source: '',
        },
        name : '',
        categoryId:'',
        description:'',
        success : true
      })

    
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
      <PageTitle title="Add a Claim"/>
      <Grid container spacing={4}>
            <Grid item lg={6} md={4} sm={6} xs={1}>
              <Widget
                disableWidgetMenu
                upperTitle
                bodyClass={this.state.classes.fullHeightBody}
                className={this.state.classes.card}
              >
   <form className={this.state.classes.root}  autoComplete="off">
      <div className={this.state.classes.formContainer}>
          <div className={this.state.classes.form}>
            <Fade in={this.state.error}>
                    <Typography color="secondary" className={this.state.classes.errorMessage}>
                      Something is wrong 
                    </Typography>
                  </Fade>

                  <Fade in={this.state.success}>
                    <Typography color="primary" className={"text-success"}>
                      Claims Added 
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
                  placeholder="Claim"
                  type="text"
                  fullWidth
                />
                <TextField
                  id="claim"
                  InputProps={{
                    classes: {
                      underline: this.state.classes.textFieldUnderline,
                      input: this.state.classes.textField,
                    },
                  }}
                  value={this.state.formData.claim}
                  onChange={e => {
                    this.setState({
                      formData : {
                        ...formData,
                        claim : e.target.value
                      }
                    })
                  }}
                  margin="normal"
                  placeholder="Information about claim"
                  type="text"
                  fullWidth
                />
                <TextField
                  id="source"
                  InputProps={{
                    classes: {
                      underline: this.state.classes.textFieldUnderline,
                      input: this.state.classes.textField,
                    },
                  }}
                  value={this.state.formData.source}
                  onChange={e => {
                    this.setState({
                      formData : {
                        ...formData,
                        source : e.target.value
                      }
                    })
                  }}
                  margin="normal"
                  placeholder="Source"
                  type="text"
                  fullWidth
                />
  
        <FormControl className={this.state.classes.formControl} >
          <InputLabel htmlFor="Categories">Categories</InputLabel>
          <Select 
          
            inputProps={{
              name: 'category',
              id: 'category',
            }}
            value={this.state.formData.categoryid}
            onChange={e => {
              this.setState({
                formData : {
                  ...formData,
                  categoryid : e.target.value
                }
              })
            }}
          >
             {this.state.categories.map((team) => <MenuItem value={team._id}>{team.category_name}</MenuItem>)}
      
          </Select>
        </FormControl>
                <br/>
                <br/>
                <div className={this.state.classes.formButtons}>
                 
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"                   
                    onClick={this.onSave}
                  >
                    Submit Claim
                  </Button>
                </div>
          </div>
      </div>
  
           
           </form> </Widget>
            </Grid>
            </Grid> 
            </>    
    )
  }
  
}
