const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());            //middleware

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/users');
const claimRouter = require('./routes/claim');
const categoryRouter = require('./routes/category');
//const verdictRouter = require('./routes/verdict');
const commentsRouter = require('./routes/comments');
const evidenceRouter = require('./routes/evidence');

app.use('/users', usersRouter);
app.use('/claim', claimRouter);
app.use('/category', categoryRouter);
//app.use('/verdict', verdictRouter);
app.use('/comments', commentsRouter);
app.use('/evidence', evidenceRouter);

app.listen(port, () =>{
    console.log(`server is running on port: ${port}`);
});