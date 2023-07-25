const { getSingleProductReviews } = require("../controllers/reviewController");
const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} = require("../controllers/productController");
const { Router } = require("express");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const router = Router();

router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createProduct)
  .get(getAllProducts);
router
  .route("/:id")
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct)
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct);
router.post(
  "/uploadImage",
  [authenticateUser, authorizePermissions("admin")],
  uploadImage
);
router.get("/:id/reviews", getSingleProductReviews);

module.exports = router;
