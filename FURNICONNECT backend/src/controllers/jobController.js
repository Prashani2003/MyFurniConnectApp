const db = require("../db/db");


// ========================
// CREATE JOB
// ========================
exports.createJob = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const owner_id = req.user.id;

    await db.query(
      "INSERT INTO jobs (title, description, budget, owner_id) VALUES (?, ?, ?, ?)",
      [title, description, budget, owner_id]
    );

    res.json({ message: "Job created successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};


// ========================
// GET JOBS
// ========================
exports.getJobs = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT j.*, u.name
      FROM jobs j
      JOIN users u ON j.owner_id = u.id
      ORDER BY j.created_at DESC
    `);

    res.json(rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};


// ========================
// APPLY JOB
// ========================
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const provider_id = req.user.id;

    // prevent duplicate
    const [existing] = await db.query(
      "SELECT * FROM job_applications WHERE job_id = ? AND provider_id = ?",
      [jobId, provider_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Already applied" });
    }

    await db.query(
      "INSERT INTO job_applications (job_id, provider_id) VALUES (?, ?)",
      [jobId, provider_id]
    );

    res.json({ message: "Applied successfully" });

  } catch (err) {
    console.log("APPLY ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/// ========================
// GET APPLICATIONS (FINAL FIX)
// ========================
exports.getApplications = async (req, res) => {
  try {
    const owner_id = req.user.id;

    const sql = `
      SELECT 
        ja.id,
        ja.status,
        ja.created_at,
        ja.provider_id AS worker_id,   -- ✅ FIX
        j.title,
        u.name AS worker_name
      FROM job_applications ja
      JOIN jobs j ON ja.job_id = j.job_id   -- ✅ FIX (NOT j.id)
      JOIN users u ON ja.provider_id = u.id
      WHERE j.owner_id = ?
      ORDER BY ja.created_at DESC
    `;

    const [rows] = await db.query(sql, [owner_id]);

    console.log("APPLICATION DATA:", rows);

    res.json(rows);

  } catch (err) {
    console.log("GET APPLICATION ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};
// ========================
// UPDATE APPLICATION STATUS
// ========================
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    await db.query(
      "UPDATE job_applications SET status = ? WHERE id = ?",  // ✅ FIX HERE
      [status, applicationId]
    );

    res.json({ message: "Status updated" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ========================
// GET MY JOBS
// ========================
exports.getMyJobs = async (req, res) => {
  try {
    const owner_id = req.user.id;

    const [rows] = await db.query(
      "SELECT * FROM jobs WHERE owner_id = ? ORDER BY created_at DESC",
      [owner_id]
    );

    res.json(rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔥 GET MY APPLICATIONS (WORKER)
exports.getMyApplications = async (req, res) => {
  try {
    const provider_id = req.user.id;

    const sql = `
      SELECT 
        ja.id,
        ja.status,
        j.title,
        j.description
      FROM job_applications ja
      JOIN jobs j ON ja.job_id = j.job_id
      WHERE ja.provider_id = ?
      ORDER BY ja.created_at DESC
    `;

    const [rows] = await db.query(sql, [provider_id]);

    res.json(rows);

  } catch (err) {
    console.log("MY APPLICATION ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};