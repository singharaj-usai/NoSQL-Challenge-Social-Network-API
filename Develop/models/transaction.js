const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//username

//String
//Unique
//Required
//Trimmed

//email

//String
//Required
//Unique
//Must match a valid email address (look into Mongoose's matching validation)

//thoughts

//Array of _id values referencing the Thought model

//friends

//Array of _id values referencing the User model (self-reference)

const transactionSchema = new Schema({

  name: {
    type: String,
    trim: true,
    required: "Enter a name for transaction"
  },
  value: {
    type: Number,
    required: "Enter an amount"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
