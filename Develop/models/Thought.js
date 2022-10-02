const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const thoughtSchema = new Schema({

//thoughtText

//String
//Required
//Must be between 1 and 280 characters
  thoughtText: {
    type: String,
minlength: 1,
maxlength: 280,
    required: "Enter a name"
  },
//createdAt

//Date
//Set default value to the current timestamp
//Use a getter method to format the timestamp on query

  createdAt: {
    type: Date,
    default: Date.now,
    //get: //todo
    //momentjs look back at the week 4 activities
    //for momentjs time format
  },

//username (The user that created this thought)
//String
//Required

  username: {
    type: String,
    required: "Enter a username",
  },

//reactions (These are like replies)

//Array of nested documents created with the reactionSchema
//todo
//FOUND IT
//25-ins_crud-subdoc video.js
//responses: [Response],
reactions: [reactionSchema],
},
//const responseSchema = new Schema(
//  {
//    reactionId: {
//      type: Schema.Types.ObjectId,
//      default: () => new Types.ObjectId(),
 //   },
//    responseBody: {
//      type: String,
 //     required: true,
 //     maxlength: 280,
 //   },
//    username: {
//      type: String,
//      required: true,
//    },
//    createdAt: {
//      type: Date,
//      default: Date.now,
//    },
//  },



//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});



// Create a virtual property `upvoteCount` that gets the amount of comments per user
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.upvotes;
  });

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
