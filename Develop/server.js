const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const { connect } = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes'));

// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost/NoSQLAssignment';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.listen(PORT, () =>
console.log(`API server for running on port ${PORT}!`)
);