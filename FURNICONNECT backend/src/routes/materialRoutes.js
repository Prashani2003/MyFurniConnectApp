const express = require("express");
const router = express.Router();

const {addMaterial} = require("../controllers/materialController");
const {getMaterials} = require("../controllers/materialController");

router.post("/add", addMaterial);
router.get("/all", getMaterials);

module.exports = router;