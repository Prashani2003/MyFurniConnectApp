const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages
} = require("../controllers/chatController");

const authMiddleware = require("../middleware/authMiddleware");

// SEND MESSAGE
router.post("/", authMiddleware, sendMessage);

// GET MESSAGES
router.get("/:userId", authMiddleware, getMessages);
module.exports = router;