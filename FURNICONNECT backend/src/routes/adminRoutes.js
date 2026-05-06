const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllJobs,
  deleteJob,
  getAllReviews,
  deleteReview,
  getAllMaterials,
  deleteMaterial
} = require("../controllers/adminController");

// ========================
// DASHBOARD
// ========================
router.get(
  "/dashboard",
  authMiddleware,
  getDashboardStats
);

// ========================
// USERS
// ========================
router.get(
  "/users",
  authMiddleware,
  getAllUsers
);

router.delete(
  "/users/:id",
  authMiddleware,
  deleteUser
);

// ========================
// JOBS
// ========================
router.get(
  "/jobs",
  authMiddleware,
  getAllJobs
);

router.delete(
  "/jobs/:id",
  authMiddleware,
  deleteJob
);

// ========================
// REVIEWS
// ========================
router.get(
  "/reviews",
  authMiddleware,
  getAllReviews
);

router.delete(
  "/reviews/:id",
  authMiddleware,
  deleteReview
);

// ========================
// MATERIALS
// ========================
router.get(
  "/materials",
  authMiddleware,
  getAllMaterials
);

router.delete(
  "/materials/:id",
  authMiddleware,
  deleteMaterial
);

module.exports = router;