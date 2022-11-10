const {User} = require('../models');

const userController = {
  //get all users
  getUsers(req, res) {
    User.find()
      .populate({
        path: 'friends',
        select: '-__v -thoughts'
      })
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      });
  },
  // get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .populate({ path: 'friends', select: '-__v -thoughts' })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      });
  },
  
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      body,
      { runValidators: true, new: true })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteUser(req, res) {
    Thought.findOneAndRemove(
      { _id: req.params.id })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json(err)
      });
  },

  // Add a user response
  addUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      });
  },

    // Remove video response
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((dbUserData) =>
          !dbUserData
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(dbUserData)
        )
        .catch((err) => {
          res.status(400).json(err)
        });
    },

};

module.exports = userController;