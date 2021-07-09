import React from "react";
import axios from 'axios';
import { PlayCircleFilledWhiteRounded } from "@material-ui/icons";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
loadCategories();

function userReducer(state, action) {
 
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, signUpUser, loginUser, signOut,loadCategories };

// ###########################################################

function loginUser(dispatch, email, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!email && !!password) {
    setTimeout(() => {
      axios.post("http://localhost:5000/users/login", {email: email, password: password})
      .then(function (response) {
        console.log(response);
        if(response!= null && response.data._id != undefined){
            localStorage.setItem("id_token", response.data._id);
            dispatch({ type: "LOGIN_SUCCESS" });
            setError(null);
            setIsLoading(false);
            history.push("/private/claims/All");
        }else{
          dispatch({ type: "LOGIN_FAILURE" });
          setError(true);
          setIsLoading(false);
        }
        
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
        setIsLoading(false);
      })

    }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signUpUser(dispatch, username, email, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!email && !!password && !!username) {
    setTimeout(() => {
      axios.post("http://localhost:5000/users/add", {username: username, email: email, password: password})
      .then(function (response) {
        console.log(response);
        if(response!= null && response.data._id != undefined){
            localStorage.setItem("id_token", response.data._id);
            dispatch({ type: "LOGIN_SUCCESS" });
            setError(null);
            setIsLoading(false);
            history.push("/private/claims/All");
        }else{
          dispatch({ type: "LOGIN_FAILURE" });
          setError(true);
          setIsLoading(false);
        }
        
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
        setIsLoading(false);
      })

    }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/app/home");
}


function loadCategories(){

  axios.get("http://localhost:5000/category")
  .then(response => { 
    console.log(response)
    localStorage.setItem("categories",JSON.stringify(response.data));
    
  })
  .catch(error => console.log(error.response));

}