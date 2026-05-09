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

    const userId = req.user.user_id;

    const [reviews] = await db.query(

      `
      SELECT
        reviews.*,
        users.name AS reviewer_name
      FROM reviews
      JOIN users
      ON reviews.reviewer_id = users.id
      WHERE reviewee_id = ?
      ORDER BY created_at DESC
      `,

      [userId]

    );

    res.json(reviews);

  } catch (error) {

    console.log(
      "GET MY REVIEWS ERROR:",
      error
    );

    res.status(500).json({
      message: "Server error"
    });

  }

};