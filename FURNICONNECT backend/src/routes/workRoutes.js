const express =
  require("express");

const router =
  express.Router();

const {

  addWork,

  getWorks

} = require(
  "../controllers/workController"
);

const verifyToken =
require(
  "../middleware/authMiddleware"
);

const upload =
require(
  "../middleware/upload"
);


// ========================
// ADD WORK
// ========================

router.post(
  "/",
  verifyToken,
  upload.array("images", 5),
  addWork
);

// ========================
// GET ALL WORKS
// ========================

router.get(

  "/",

  getWorks

);


// ========================
// EXPORT
// ========================

module.exports = router;