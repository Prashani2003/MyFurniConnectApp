const express = require("express");

const router = express.Router();

const {
  addMaterial,
  getMaterials,
  deleteMaterial
} = require("../controllers/materialController");

const verifyToken = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

// ADD MATERIAL
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  addMaterial
);

// GET MATERIALS
router.get(
  "/",
  getMaterials
);

// DELETE MATERIAL
router.delete(
  "/:id",
  verifyToken,
  deleteMaterial
);

module.exports = router;