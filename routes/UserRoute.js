const router = require("express").Router();
const {
  // User API'S
  addUser,
  loginUser,
  updateUserProfile,
  getUserProfile,

  // Admin API'S
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  FilterUsers,
  getUserById,
  updateUser,
  getAllUsers,

  // Admin and User API'S
  findUser,
  deleteUser,
  pagination,
  passwordChange,
  resetPassword,
  UserStatusApprove,
} = require("../controllers/UserCtrl");

const {
  userMiddleware,
  adminMiddleware,
  userLogin,
  adminLogin,
} = require("../middlewares/authMiddleware");
const response = require("../utils/response");

// User API'S Routes
router.post("/addUser", userLogin, addUser, response);
router.post("/loginUser", userLogin, loginUser);
router.get("/get/userProfile", userMiddleware, getUserProfile);
router.put("/userProfile/update", userMiddleware, updateUserProfile, response);

// Admin API'S Routes
router.post("/loginAdmin", adminLogin, loginAdmin);
router.get("/search", adminMiddleware, FilterUsers, response);
router.get("/userId/:id", adminMiddleware, getUserById, response);
router.get("/get/alluser", adminMiddleware, getAllUsers);
router.get("/admin/profile", adminMiddleware, getAdminProfile);
router.get("/find/user", adminMiddleware, findUser, response);
router.put("/updateUser/:id", adminMiddleware, updateUser, response);
router.put("/adminProfile/update", adminMiddleware, updateAdminProfile, response);

// Admin and User API'S Routes
router.put("/passwordChange", userMiddleware, passwordChange, response);
router.put("/changePass", userLogin, resetPassword, response);
router.put("/updateUserstatus/:id", userMiddleware, UserStatusApprove, response);
router.delete("/deleteUser/:id", userMiddleware, deleteUser, response);
router.get("/page/:page&:count", userMiddleware, pagination, response);

module.exports = router;
