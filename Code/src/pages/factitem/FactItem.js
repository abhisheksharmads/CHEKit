import React,{ useState ,Component} from "react";
import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


import {
  Grid,
  CircularProgress,
  
  Button,
  TextField,
  Fade,
} from "@material-ui/core";

import * as Icons from "@material-ui/icons"

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";


const StyledBadge = withStyles(theme => ({
  badge: {
    top: '50%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}))(Badge);


// function handleInputChange(){
//   console.log(this.value);
// }
export default class FactItem extends Component {


  constructor(props){
    super(props)
    this.state = {
      isLoading : false,
      searchResults : [],
      factObj : [],
      classes : useStyles,
      evidences : [],
      evidenceCount : 1,
      isLoading : false,
      setIsLoading: false,
      error: null,
      setError : null,
      evidence: '',
      url:'',
      formData : {
        evidence : '',
        url : '',     
        verdict: "false",  
      },
      error : false
    }
    
  }

  onSave = () => {
    this.setState({
      isLoading:true
  }); 

  if((this.state.evidence != null && this.state.evidence.length > 0) &&
  (this.state.url != null && this.state.source.length > 0) &&
  (this.state.source != null && this.state.source.length > 0) ){

    axios.post("http://localhost:5000/evidence/add",{ 
    
        evidence : this.state.evidence,
        url: this.state.url,
        claim: this.props.match.params.id,
        source : this.state.source,
        verdict : this.state.verdict,
        upcount:0,
        downcount:0,
        
       
     })
    .then(response => { 

      this.setState({
        isLoading:false,
        evidence : '',
        url: '',
        source: '',
        verdict: 'false',
    });

      console.log(response)

      axios.get(`http://localhost:5000/evidence/claim/${this.props.match.params.id}`)
      .then(response => { 
        console.log(response)
        if(response.data !== undefined){
          this.setState({
            isLoading:false,
            evidences : response.data
          });
        }else{
          this.setState({
            isLoading:false,
            evidences : []
          });
        }
      })
      .catch(error => console.log(error.response));
    
    })
    .catch(error => console.log(error.response));


  }else{

    this.setState({
      error:true,
      isLoading:false
  }); 

  }

    /*
    axios.post("http://localhost:5000/evidence/add",{ 
    
        upcount:0,
        downcount:0,
       isTrue: this.state.formData.verdict,
        claim_id: this.props.match.params.id
       
     })
    .then(response => { 
      console.log(response)
      this.setState({
        isLoading:false
    });
    })
    .catch(error => console.log(error.response));

*/
   


  }

  addMoreEvidence = () =>{
   
    let previousCount = this.state.evidenceCount;
    
    this.setState({
      evidenceCount : (previousCount+1)
    });

  }
 
  onSearch = () => {
    this.setState({
      isLoading:true
  });
  
    axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.state.formData.searchItem}&api-key=lfWcE6y1Z4XzCVuujJdRvSH81XpXrJFC`)
    .then(response => { 
      console.log(response);
      if(response.data !== undefined){
        this.setState({
          isLoading:false,
            searchResults : response.data.response.docs
        });
      }else{
        this.setState({
          isLoading: false,
          searchResults : []
      });
      }
  })
  .catch(error => console.log(error.response));
  }

  copyToEvidence =(searchRes) =>{

    console.log(searchRes);
    this.setState({
      evidence: searchRes.snippet,
      url: searchRes.web_url
    });



  }

  componentWillMount(){
    
    const claimId  = this.props.match.params.id

    this.setState({
      isLoading : true,

    })
    //APIconst url = "`claimId";
    axios.get(`http://localhost:5000/claim/${claimId}`)
      .then(response => { 
        console.log(response)
        this.setState({
          factObj : response.data,
          isLoading : false
        });
    })
    .catch(error => console.log(error.response));

    axios.get(`http://localhost:5000/evidence/claim/${claimId}`)
    .then(response => { 
      console.log(response)
      if(response.data !== undefined){
        this.setState({
          isLoading:false,
          evidences : response.data
        });
      }else{
        this.setState({
          isLoading:false,
          evidences : []
        });
      }
    })
    .catch(error => console.log(error.response));
     
  }


render(){
  const { formData } = this.state;
  return (
    <>
    
    <PageTitle title={this.state.factObj.name}/>

    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={6} xs={6}>

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
      <Grid item lg={12} md={12} xs={12}>

     


      <div className={this.state.classes.form}>
        <TextField
          id="search"
          name="searchtext"
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
          onChange={e => {
            this.setState({
              formData : {
                ...formData,
                searchItem : e.target.value
              }
            })
          }}
         
        />


{this.state.isLoading ? (
                  <CircularProgress size={26} className={this.state.classes.loginLoader} />
                ) : (
                  <Button
          classes={{ root: this.state.classes.button,}}
          variant="contained"
          size="large"
          color="secondary"
          onClick={this.onSearch}
        >
          Search
        </Button>
                )}

        
      </div>
      <br/>
      <br/>
      <Grid container spacing={2}>
     
      { 
              
              this.state.searchResults.map((searchRes) =>


          <Grid item xs={12} md={12}>
          
          

          <Typography variant="h5" className={this.state.classes.text}>
          <a href={searchRes.web_url} >{searchRes.headline.main}</a>
          
            <Button
                classes={{ root: this.state.classes.button }}
                variant="contained"
                size="small"
                color="secondary"               
                className="pull-right"
                data-url = {searchRes.web_url}
                data-text = {searchRes.snippet}
                onClick={() => this.copyToEvidence(searchRes)}
               
              >
                Add
            </Button>

                  </Typography>
                  <Typography className={this.state.classes.text}>
                  {searchRes.snippet} 
                 </Typography>
      </Grid>

)
}
      </Grid>
      
      
                  </Grid>
                </Grid>
        </Widget>

      </Grid>


      <Grid item lg={6} md={6} sm={6} xs={6}>
    
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
                  <Grid item xs={12} >

              <Fade in={this.state.error}>
                    
                <Typography color="secondary" className={this.state.classes.errorMessage}>

                  Something is wrong with data :( 
                </Typography>
              </Fade>
              
              
              <TextField
                id="Evidence"
                InputProps={{
                  classes: {
                    underline: this.state.classes.textFieldUnderline,
                    input: this.state.classes.textField,
                  },
                }}    
                required            
                value = {this.state.evidence}
                margin="normal"
                placeholder="Evidence"
                type="evidence"
                fullWidth
                onChange={e => {
                  this.setState({
                    evidence : e.target.value                    
                  })
                }}
              />
              <TextField
                id="url"
                InputProps={{
                  classes: {
                    underline: this.state.classes.textFieldUnderline,
                    input: this.state.classes.textField,
                  },
                }}
                required
                value = {this.state.url}
                onChange={e => {
                  this.setState({
                    url : e.target.value                    
                  })
                }}          
                margin="normal"
                placeholder="url"
                type="url"
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
                value = {this.state.source}
                onChange={e => {
                  this.setState({
                    source : e.target.value                    
                  })
                }}          
                margin="normal"
                placeholder="Source"
                type="source"
                fullWidth
              />

   
      
      <FormControl component="fieldset" className={""}>
        <FormLabel component="legend">Verdict</FormLabel>
        <RadioGroup
          aria-label="Verdict"
          name="Verdict"
          className={ ""}    
          value = {this.state.verdict}      
          onChange={e => {
            this.setState({
               verdict : e.target.value              
            })
          }}   
        >
          <FormControlLabel value="true" control={<Radio />} label="TRUE" />
          <FormControlLabel value="false" control={<Radio />} label="FALSE" />
          <FormControlLabel value="ic" control={<Radio />} label="INCONCLUSIVE" />
        
        </RadioGroup>
      </FormControl>


      {/* <Switch
        value="true"
        inputProps={{ 'aria-label': 'Switch A' }}
        onChange={e => {
          this.setState({
            formData : {
              ...formData,
              verdict : e.target.value
            }
          })
        }}   
/> */}
{/* <IconButton aria-label="cart">
      <StyledBadge badgeContent={4} color="primary">
        <ArrowUpward />
      </StyledBadge>
    </IconButton>


     <IconButton aria-label="cart">
      <StyledBadge badgeContent={4} color="error">
      <ArrowDownward />
      </StyledBadge>
    </IconButton>   */}

              <div className={this.state.classes.formButtons}>
                {this.state.isLoading ? (
                  <CircularProgress size={26} className={this.state.classes.loginLoader} />
                ) : (
                  <Button
                   
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={this.onSave}
                  >
                    Submit
                  </Button>
                )}
               
              </div>      

     

                  </Grid>
                </Grid>

                  <ul>
                {

         this.state.evidences.map((evidenceItem)=> 
            
                  <li>

           <p> Evidence: {evidenceItem.evidence}</p>
            <p>URL:<a href={evidenceItem.url} > {evidenceItem.url} </a></p>
            <p> Source: {evidenceItem.source}</p>
            </li>  
         
                
         )        
      }
          </ul>
        </Widget>

      </Grid>


      </Grid>
   

    </>
  )
    }
}

