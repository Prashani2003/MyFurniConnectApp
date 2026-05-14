const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
  getConversations

} = require("../controllers/chatController");

const authMiddleware = require("../middleware/authMiddleware");

// ========================
// SEND MESSAGE
// ========================

router.post(
  "/send",
  authMiddleware,
  sendMessage
);


// ========================
// GET CONVERSATIONS
// ========================

router.get(
  "/conversations/list",
  authMiddleware,
  getConversations

);

// ========================
// GET MESSAGES
// ========================

router.get(
  "/:receiverId",
  authMiddleware,
  getMessages
);

module.exports = router;