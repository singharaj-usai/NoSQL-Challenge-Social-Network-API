const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({

//username

//String
//Unique
//Required
//Trimmed
  username: {
    type: String,
    unique: true,
    trim: true,
    required: "Enter a name"
  },
//email

//String
//Required
//Unique
//Must match a valid email address (look into Mongoose's matching validation)

  email: {
    type: String,
    required: "Enter an email",
    unique: true,
    match: [/.+@.+\..+/]//mongoose match validation

  },
  //thoughts

//Array of _id values referencing the Thought model

  thoughts: {
    type: Date, //wait
    ref: 'Thought',
  },

  //friends

//Array of _id values referencing the User model (self-reference)
friends: {
  type: Date, //wait
  ref: 'User',
},

});

const User = mongoose.model("User", userSchema);

module.exports = User;
