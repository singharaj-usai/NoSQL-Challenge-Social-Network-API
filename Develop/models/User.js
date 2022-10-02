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
//schema.types from 26-stu-crud-subdoc
  thoughts: {
    type: Schema.Types.ObjectId,
    ref: 'Thought',
  },

  //friends

//Array of _id values referencing the User model (self-reference)
friends: {
  //same here
  type: Schema.Types.ObjectId,
  ref: 'User',
},



},
//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
//23-ins_subdoc-population/models/post.js
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);
// Create a virtual property `upvoteCount` that gets the amount of comments per user
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.upvotes;
  });

const User = mongoose.model("User", userSchema);

module.exports = User;
