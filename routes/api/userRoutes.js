const router = require("express").Router();

const {
  getAllUsers,
  createUser,
  getUserbyId,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users GET all, POST user
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id GET by id, PUT user, DELETE user
router.route("/:id").get(getUserbyId).put(updateUser).delete(deleteUser);

// /api/users/:id/friends/:friendId POST create friend, DELETE friend
router.route("/:id/friends/:friendId").post(createFriend).delete(deleteFriend);

module.exports = router;
