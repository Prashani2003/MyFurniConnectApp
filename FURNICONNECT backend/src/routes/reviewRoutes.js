const express = require("express");
const router = express.Router();

const {
  addReview,
  getMyReviews
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

// 🔥 ADD REVIEW
router.post("/", authMiddleware, addReview);

// 🔥 GET MY REVIEWS
router.get("/", authMiddleware, getMyReviews);

module.exports = router;