const db = require("../db/db");

// ========================
// ADD REVIEW
// ========================
exports.addReview = async (req, res) => {
  try {
    const reviewer_id = req.user.id;
    const { reviewee_id, rating, comment } = req.body;

    console.log("DATA:", reviewer_id, reviewee_id, rating, comment); // 🔥 DEBUG

    await db.query(
      "INSERT INTO reviews (reviewer_id, reviewee_id, rating, comment) VALUES (?, ?, ?, ?)",
      [reviewer_id, reviewee_id, rating, comment]
    );

    res.json({ message: "Review added" });

  } catch (err) {
    console.log("ADD REVIEW ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ========================
// GET REVIEWS FOR USER
// ========================
exports.getMyReviews = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT r.*, u.name AS reviewer_name
       FROM reviews r
       JOIN users u ON r.reviewer_id = u.id
       WHERE r.reviewee_id = ?   -- 🔥 THIS IS THE FIX
       ORDER BY r.created_at DESC`,
      [userId]
    );

    res.json(rows);

  } catch (err) {
    console.log("GET REVIEWS ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};