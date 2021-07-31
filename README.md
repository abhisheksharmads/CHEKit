# CHEKit! A Community Based Fact-Checking Web Application

1) This is a Community-based Fact-checking website which has been developed using the MongoDB, Express, React and Node.js
2) The purpose of this research was to spread awareness and showcase the importance of fact-checking on a community level, where users can interact and give verdicts on a fact given by the other users.

## Getting Started

1) Open the code folder and unzip the code file.
2) Now open Visual Studio Code and open the folder "Code" with it.

### Prerequisites
1) Visual Studio Code
2) Node installed in order to run npm commands through the terminal.
3) MongoDB installed with MongoDB compass for the GUI.
4) If you simply want to run the MongoDB Atlas which is based on Google CLoud Platform. Go to Code/backend/.env and change "ATLAS_URI =mongodb://localhost:27017/factcheck" to "ATLAS_URI =mongodb+srv://abhishek:abhishek@clusterabhi-qyq5u.gcp.mongodb.net/test?retryWrites=true&w=majority". MongoDB Atlas does not work with eduroam or any other university network so make sure that you are on some other network. It will be better to use MongoDB Atlas because you will be able to see data on the website. (Change the .env file in Visual Studio Code and save it before you run it again.)

These instructions are for a unix based machine and if you are using a windows machine, set up the environment for the node.

### Installing

All of these steps (Except of the 1) should be run through the terminal in Visual Studio Code

1) Start the MongoDB by running the command "mongod" in the terminal. (No need of this step if you use MongoDB Atlas)
2) Now open the terminal in the backend folder.
3) Now run "npm install".
4) Now run "npm start".
5) Now wait for the connection to be established with the database.
6) Now open the terminal in the "Code" folder where all the code files.
7) Now run "npm install".
8) Now run "npm start".
9) Now the react will launch and website will open in the browser, it will take few seconds and if a white page is just visible then refresh the page.


## Run these tests

1) Register on the system by clicking on the sign up button and filling out your full name, email address and password.

2) Try to add a category of your choice by clicking on the category button and simply fill the given field and click on the home button after that to refresh the page.

3) Try adding any claim in the category that you recently added by clicking on the add a claim button and fill out the form and select your category in the drop down menu.

4) Try Fact-Checking that claim by clicking on the fact check button and use the search engine to do your search which is available on the left side of the screen. After doing the search regarding that claim, just click on the add button and it will fill out the URL and the snippet available for the evidence and you can fill out the source of your information as well.

5) Try the search bar available on top of the category by searching for your fact-checked claim and click on it.

6) Now try to comment on that fact-checked claim by typing in the comment box and click on the submit button.

7) Now try adding more evidence by clicking on the "add more" button.

8) Now log out and try to access the restricted areas of the website without logging in.

9) Now try to log in using the wrong password.

10) Now open MongoDB compass and click on connect. You can see all the collections that have been added. (Only for local MongoDB)


### Just in case if you face these errors - 

1) Attempting to bind to HOST environment variable:x86_64-apple-darwin13.4.0

command to run - "unset HOST" and then again run "npm start"

2) Not being able to use funtionalties on the website or the website crashes.

Don't switch from local mongodb to atlas without logging out as the user details might stay in cache and this might cause problems in the website and if the data gets mixed from both the databases's then it will not able to run these features. So make sure that your details are on either database and you use that one to test the features.

or use the website in incognito mode

3) White screen after first launch through react.

Just refresh the page again but first wait for the page to load. This happenes only when you run the application for the first time.


Port - http://localhost:3000
