const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const { Router } = require("express");
const router = Router();

router.get("/", authenticateUser, authorizePermissions("admin"), getAllUsers);
router.get("/:id", authenticateUser, getSingleUser);
router.get("/showMe", authenticateUser, showCurrentUser);
router.post("/updateUserPassword", authenticateUser, updateUserPassword);
router.post("/updateUser", authenticateUser, updateUser);

module.exports = router;
