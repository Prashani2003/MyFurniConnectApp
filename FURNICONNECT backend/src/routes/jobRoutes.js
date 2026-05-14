const express = require("express");
const router = express.Router();

const { 
  createJob, 
  getJobs, 
  applyJob, 
  getApplications,
  getMyJobs        // ✅ ADD THIS
} = require("../controllers/jobController");
const { updateApplicationStatus } = require("../controllers/jobController");
const { getMyApplications } = require("../controllers/jobController");



const authMiddleware = require("../middleware/authMiddleware");

// ==========================
// CREATE JOB
// ==========================
router.post("/", authMiddleware, createJob);

// ==========================
// GET ALL JOBS
// ==========================
router.get("/", getJobs);
// ==========================
// GET MY JOBS (OWNER)
// ==========================
router.get("/my", authMiddleware, getMyJobs);   // ✅ IMPORTANT

// ==========================
// APPLY JOB
// ==========================
router.post("/:jobId/apply", authMiddleware, applyJob);

// ==========================
// GET APPLICATIONS (OWNER)
// ==========================
router.get("/applications", authMiddleware, getApplications);


router.put("/applications/:applicationId", authMiddleware, updateApplicationStatus);

router.get("/my-applications", authMiddleware, getMyApplications);


module.exports = router;