const express = require("express");
const router = express.Router();

const { createJob} = require("../controllers/jobController");
const { getJobs } = require("../controllers/jobController");
const { applyJob } = require("../controllers/jobController");
const {getApplications} = require("../controllers/jobController");   

router.post("/create", createJob);
router.get("/all", getJobs);
router.post("/apply", applyJob);
router.get("/applications", getApplications);

module.exports = router;