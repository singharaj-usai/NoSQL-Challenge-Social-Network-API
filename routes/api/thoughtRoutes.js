const router = require("express").Router();

const {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts GET all thoughts, POST a thought
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId GET thought by id, PUT update a thought, DELETE a thought
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId POST create reaction DELETE create reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
