const db = require("../db/db");

// ========================
// GET DASHBOARD STATS
// ========================
exports.getDashboardStats = async (req, res) => {

  try {

    const [[users]] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [[jobs]] = await db.query(
      "SELECT COUNT(*) AS totalJobs FROM jobs"
    );

    const [[reviews]] = await db.query(
      "SELECT COUNT(*) AS totalReviews FROM reviews"
    );

    const [[materials]] = await db.query(
      "SELECT COUNT(*) AS totalMaterials FROM materials"
    );

    res.json({
      totalUsers: users.totalUsers,
      totalJobs: jobs.totalJobs,
      totalReviews: reviews.totalReviews,
      totalMaterials: materials.totalMaterials
    });

  } catch (err) {

    console.log("DASHBOARD ERROR:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

};

// ========================
// GET ALL USERS
// ========================
exports.getAllUsers = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT 
        id,
        name,
        email,
        role
      FROM users
      ORDER BY id DESC
    `);

    res.json(rows);

  } catch (err) {

    console.log("GET USERS ERROR:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

};

// ========================
// DELETE USER
// ========================
exports.deleteUser = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    res.json({
      message: "User deleted successfully"
    });

  } catch (err) {

    console.log("DELETE USER ERROR:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

};

// ========================
// GET ALL JOBS
// ========================
exports.getAllJobs = async (req, res) => {

  try {

    const [jobs] = await db.query(`
      SELECT 
        jobs.job_id,
        jobs.title,
        jobs.description,
        jobs.budget,
        users.name
      FROM jobs
      JOIN users
      ON jobs.owner_id = users.id
      ORDER BY jobs.job_id DESC
    `);

    console.log("ALL JOBS:", jobs);

    res.json(jobs);

  } catch (err) {

    console.log("GET JOBS ERROR:", err);

    res.status(500).json({
      error: "Failed to load jobs"
    });

  }

};

// ========================
// DELETE JOB
// ========================
exports.deleteJob = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM jobs WHERE job_id = ?",
      [id]
    );

    res.json({
      message: "Job deleted successfully"
    });

  } catch (err) {

    console.log("DELETE JOB ERROR:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

};

// ========================
// GET ALL REVIEWS
// ========================
exports.getAllReviews = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT 
        review_id,
        rating,
        comment,
        reviewer_id,
        reviewee_id
      FROM reviews
      ORDER BY review_id DESC
    `);

    res.json(rows);

  } catch (err) {

    console.log("GET REVIEWS ERROR:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

};

// ========================
// DELETE REVIEW
// ========================
exports.deleteReview = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM reviews WHERE review_id = ?",
      [id]
    );

    res.json({
      message: "Review deleted successfully"
    });

  } catch (err) {

    console.log("DELETE REVIEW ERROR:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

};

// ========================
// GET ALL MATERIALS
// ========================
exports.getAllMaterials = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM materials
      ORDER BY id DESC
    `);

    res.json(rows);

  } catch (err) {

    console.log("GET MATERIALS ERROR:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

};

// ========================
// DELETE MATERIAL
// ========================
exports.deleteMaterial = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM materials WHERE id = ?",
      [id]
    );

    res.json({
      message: "Material deleted successfully"
    });

  } catch (err) {

    console.log("DELETE MATERIAL ERROR:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

};