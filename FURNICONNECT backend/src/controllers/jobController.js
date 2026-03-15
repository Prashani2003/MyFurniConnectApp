const db = require("../db/db");

exports.createJob = (req, res) => {

  const { owner_id, title, description, budget } = req.body;

  const sql =
    "INSERT INTO jobs (owner_id,title,description,budget) VALUES (?,?,?,?)";

  db.query(sql, [owner_id, title, description, budget], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Job created successfully"
    });

  });

};

exports.getJobs = (req, res) => {

  const sql = "SELECT * FROM jobs";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

exports.applyJob = (req, res) => {

  const { job_id, provider_id } = req.body;

  const sql =
    "INSERT INTO job_applications (job_id, provider_id) VALUES (?, ?)";

  db.query(sql, [job_id, provider_id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Application submitted successfully"
    });

  });

};

exports.getApplications = (req, res) => {

  const sql = "SELECT * FROM job_applications";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};