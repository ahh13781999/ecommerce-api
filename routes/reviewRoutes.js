const {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} = require("../controllers/reviewController");
const { Router } = require("express");
const { authenticateUser } = require("../middleware/authentication");
const router = Router();

router.route("/").get(getAllReviews).post(authenticateUser, createReview);
router
  .route("/:id")
  .patch(authenticateUser, updateReview)
  .get(getSingleReview)
  .delete(authenticateUser, deleteReview);

module.exports = router;
