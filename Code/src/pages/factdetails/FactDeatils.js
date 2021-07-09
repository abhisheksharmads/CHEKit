import React,{Component} from "react";
import axios from 'axios';
import Moment from 'moment';
import {
  Button,
  Grid,
  TextField,  
  CircularProgress,  
  
  Tabs,
  Tab,
  
  Fade,
} from "@material-ui/core";


import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Notification from "../../components/Notification";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


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

export default class FactDeatils extends Component {

  constructor(props){
    super(props)
    this.state = {
      isLoading : false,
      categories : [],
      factObj : [],
      classes : useStyles,
      isLoading : false,
      setIsLoading: false,
      comment: '',
      comments : [],
      claimId: '',
      error: null,
      setError : null,
      formData : {
        name : '',
        claim: '',
        // url: '',
        // source: '',
        categoryid: ''
      },
      upvote : 0,
      downvote: 0,
      evidence_id: '',
      isAuth : false,
      evidences : []
      
    }
    
  }
  

  
  componentWillMount(){
    
   
    const claimId  = this.props.match.params.id

    this.setState({
      isLoading : true,
      claimId : this.props.match.params.id,
      isAuth : !!localStorage.getItem("id_token")

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
    

    axios.get(`http://localhost:5000/comments/claim/${claimId}`)
    .then(response => { 
      console.log(response)
      if(response.data !== undefined){
        this.setState({
          isLoading:false,
          comments : response.data
        });
      }else{
        this.setState({
          isLoading:false,
          evidences : []
        });
      }
    })
    .catch(error => console.log(error.response));


    /*axios.get(`http://localhost:5000/evidence/byclaim/${this.props.match.params.id}`)
    .then(response => { 
      console.log("byclaim " + response)
      this.setState({
          upvote : response.data.upcount,
          downvote: response.data.downcount,
          evidence_id : response.data._id

      });
    })
    .catch(error => console.log(error.response));
*/

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


  updateDownVerdict = (id,voteCount) => {
   

      axios.post(`http://localhost:5000/evidence/vote/${id}`,{ 
      
       // upcount: this.state.upvote,
        downcount: (voteCount +1 ),
        //isTrue: this.state.formData.evidence,
        id: this.state.claimId
       
     })
        .then(response => { 
          console.log(response)
          axios.get(`http://localhost:5000/evidence/claim/${this.state.claimId}`)
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

    
  }

  updateUpVerdict = (id,voteCount) => {

      axios.post(`http://localhost:5000/evidence/vote/${id}`,{ 
        
        upcount: (voteCount+1),
       // downcount: this.state.downvote,
       // isTrue: this.state.formData.evidence,
        id: this.state.claimId
       
     })
        .then(response => { 
          console.log(response)
          axios.get(`http://localhost:5000/evidence/claim/${this.state.claimId}`)
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

    
  }

  addComments = () =>{

    axios.post("http://localhost:5000/comments/add",{ 
    
      comment_text : this.state.comment,
      user_id : window.localStorage.getItem('id_token'),
      claim_id : this.state.claimId,
     
    })
    .then(response => { 
      console.log(response);
        this.setState({
          isLoading:false,
          comment : ''
      });

    axios.get(`http://localhost:5000/comments/claim/${this.state.claimId}`)
    .then(response => { 
      console.log(response)
      if(response.data !== undefined){
        this.setState({
          isLoading:false,
          comments : response.data
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
  }




  render(){
    Moment.locale('en');
    const isAuthenticated = this.state.isAuth;
    const classes = this.state.classes;

  return (
    <>
        
    <PageTitle title="Fact Details"/>

    <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Widget
           
            upperTitle
            bodyClass={this.state.classes.fullHeightBody}
            className={this.state.classes.card}
            disableWidgetMenu
          >
            <div className={this.state.classes.visitsNumberContainer}>
              
              <Typography size="xl" weight="medium">
                {this.state.factObj.name}
              </Typography>
              <Typography className={this.state.classes.text}>
                {this.state.factObj.description}          
              </Typography>
              <Typography className={this.state.classes.text}>
                Source : {this.state.factObj.source}
              </Typography>
              <Typography className={this.state.classes.text}>
                  Date : {Moment(this.state.factObj.createdAt).format('YYYY-MM-DD ') }
                  Time: {Moment(this.state.factObj.createdAt).format('hh:mm:ss') }
              </Typography>

            </div>
           
          </Widget>

        </Grid>

       



<Grid item lg={12} md={12} sm={12} xs={12}>
          <Widget
            title="Evidences"
            disableWidgetMenu
            upperTitle
            bodyClass={this.state.classes.fullHeightBody}
            className={this.state.classes.card}

          > 
        

        <Button
      classes={{ root: [ 'pull-right' ]  }}
      variant="contained"
      size="small"
      color="secondary"
      href={ `#/private/factitem/${this.state.claimId}` }
    >
        Add More
      </Button>
      

<br />
<br />

<ul>

      {

         this.state.evidences.map((evidenceItem)=> 
            
                  <li>

            <p> Snippets : {evidenceItem.evidence}</p>
            <p>URL:<a href={evidenceItem.url} target="_blank"> {evidenceItem.url} </a></p>
            <p> Source: {evidenceItem.source}</p>
            <p>
            Date : {Moment(evidenceItem.createdAt).format('YYYY-MM-DD ') }
            Time: {Moment(evidenceItem.createdAt).format('hh:mm:ss') }
            </p>

            {/* </li>  
         
            
                
         )        
      }
          </ul>

        </Widget>

        </Grid>



          <Grid item lg={12} md={12} sm={12} xs={12}>
          <Widget
            title="Verdict"
            disableWidgetMenu
            upperTitle
            bodyClass={this.state.classes.fullHeightBody}
            className={this.state.classes.card}
          > */}
          <p>
             {  isAuthenticated ? ( 
              <Grid
              className={  "pull-right" }
              item
              md={3}
              lg={2}
              sm={4}
              xs={12}
              >

                <IconButton aria-label="cart" onClick={() => this.updateUpVerdict(evidenceItem._id,evidenceItem.upcount)}>
                    <StyledBadge badgeContent={evidenceItem.upcount} color="primary" >
                      <ArrowUpward />
                    </StyledBadge>
                </IconButton>
                <IconButton aria-label="cart" onClick={() => this.updateDownVerdict(evidenceItem._id,evidenceItem.downcount)} >
                  <StyledBadge badgeContent={evidenceItem.downcount} color="error">
                  <ArrowDownward />
                  </StyledBadge>
                </IconButton>  
               </Grid>
              ) : (<></>)

              }
        
          <Grid
            className={ "" }
            item
            md={3}
            lg={2}
            sm={4}
            xs={12}
          >
           
          {(evidenceItem.verdict === "false" ) ? (

              <Icons.Clear    
                  color="error"
                  style={{ fontSize: 50 }}
              />
          
          ) : (
            <>
            {
              (evidenceItem.verdict === "ic") ? 
              (

                  <></>

              ) : (

                  <Icons.Check           
                  style={{ fontSize: 50 , color : "green"}}
                  />
              )
            }
            </>
          
          ) }

          <Typography className={this.state.classes.materialIconText} size="large" color={ (evidenceItem.verdict === "false") ? "error" : "success" } >
          { (evidenceItem.verdict === "false" ) ? "False" : 
          
            <>
          {
            (evidenceItem.verdict === "ic" ) ? 
            (

               "Inconclusive"

            ) : (

              "True"
            )
          }
              </>
          
          
          
          
          }
          </Typography>
        
        </Grid>
        </p>
        <Divider variant="" component="p" />
        </li>          
         )
      }
        </ul>
        
        </Widget>


        </Grid>
        
      

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Widget
            title="Comments"
            disableWidgetMenu
            upperTitle
            bodyClass={this.state.classes.fullHeightBody}
            className={this.state.classes.card}
          >


{

this.state.comments.map((commentItem)=>
    


      <List className={classes.root}>
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
                  <Icons.MessageRounded    
                        color="primary"
                       
                    />
              </ListItemAvatar>
              <ListItemText              
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      By: {commentItem.User[0].username} - 
                    </Typography>
                    {commentItem.comment_text}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="" component="div" />
        </List>
  )
}


        </Widget>
        </Grid>


        {  isAuthenticated ? (
                 
        
<Grid item lg={12} md={12} sm={12} xs={12}>
  <Widget
    title="Add Comments"
    disableWidgetMenu
    upperTitle
    bodyClass={this.state.classes.fullHeightBody}
    className={this.state.classes.card}
  >
    <Grid container>
<Grid item lg={10} md={10} sm={12} xs={12}>

        <TextField
        id="standard-full-width"
        value = {this.state.comment}
        style={{ margin: 8 }}
        placeholder="You comments here"
        helperText="Add comments to the fact"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e => {
          this.setState({
            comment : e.target.value                    
          })
        }}     
      />
</Grid>
<Grid item lg={2} md={2} sm={12} xs={12} >

<Button
          classes={{ root: ["pull-right"]}}
          variant="contained"
          size="large"
          color="secondary"
          onClick = {this.addComments}
        > 
          Submit
        </Button>
</Grid>
</Grid>
</Widget>


</Grid>
        ): (<></>) }




        </Grid>


        
         

    

    </>
  )
      }
}
