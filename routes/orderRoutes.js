const {
  createOrder,
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrder,
  updateOrder,
} = require("../controllers/orderController");
const { Router } = require("express");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const router = Router();

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllOrders)
  .post(authenticateUser, createOrder);
router
  .route("/:id")
  .patch(authenticateUser, updateOrder)
  .get(authenticateUser, getSingleOrder);

router.get("/showAllMyOrders", authenticateUser, getCurrentUserOrders);

module.exports = router;
