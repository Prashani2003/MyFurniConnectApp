const db = require("../db/db");

exports.addReview = (req, res) => {

  const { reviewer_id, reviewee_id, rating, comment } = req.body;

  const sql =
    "INSERT INTO reviews (reviewer_id,reviewee_id,rating,comment) VALUES (?,?,?,?)";

  db.query(sql, [reviewer_id, reviewee_id, rating, comment], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Review added successfully"
    });

  });

};

exports.getReviews = (req, res) => {

  const { user_id } = req.query;

  const sql = "SELECT * FROM reviews WHERE reviewee_id=?";

  db.query(sql, [user_id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};