const {User} = require('../models');

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find()
      .populate({
        path: 'friends',
        select: '-__v -thoughts'
      })
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      });
  },
  // get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate({ path: 'friends', select: '-__v' })
      .populate({ path: 'thoughts', select: '-__v' })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No video with this id!' })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteUser(req, res) {
    Thought.findOneAndRemove({ _id: req.params.id })
      .then((video) =>
        !video
          ? res.status(404).json({ message: 'No video with this id!' })
          : User.findOneAndUpdate(
              { thoughts: req.params.id },
              { $pull: { responses: req.params.id } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Video created but no user with this id!' })
          : res.json({ message: 'Video successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a video response
  addUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.id } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No video with this id!' })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },

    // Remove video response
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.videoId },
        { $pull: { friends: req.params.id } },
        { runValidators: true, new: true }
      )
        .then((video) =>
          !video
            ? res.status(404).json({ message: 'No video with this id!' })
            : res.json(video)
        )
        .catch((err) => res.status(500).json(err));
    },

};

module.exports = userController;