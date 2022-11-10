// Thought Model
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: "Please enter a reaction.",
      trim: true,
      minLength: [1, "Too few characters. Can you expand on that?"],
      maxLength: [280, "Too many characters. Please be more concise!"],
    },
    username: {
      type: String,
      required: "Please enter your username.",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Please enter a thought.",
      trim: true,
      minLength: [1, "Too few characters. Can you expand on that?"],
      maxLength: [280, "Too many characters. Please be more concise!"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: "Please enter your username.",
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create the Thought Model using the above schema
const Thought = model("Thought", ThoughtSchema);

// Export the model
module.exports = Thought;
