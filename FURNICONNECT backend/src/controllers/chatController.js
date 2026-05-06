const db = require("../db/db");

// 🔥 SEND MESSAGE
exports.sendMessage = async (req, res) => {
  try {
    const sender_id = req.user.id;
    const { receiver_id, message } = req.body;

    console.log("MSG DATA:", sender_id, receiver_id, message);

    await db.query(
      "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
      [sender_id, receiver_id, message]
    );

    res.json({ message: "Message sent" });

  } catch (err) {
    console.log("SEND ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔥 GET MESSAGES
exports.getMessages = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { receiverId } = req.params;

    const [rows] = await db.query(
      `SELECT * FROM messages
       WHERE 
       (sender_id = ? AND receiver_id = ?)
       OR
       (sender_id = ? AND receiver_id = ?)
       ORDER BY created_at ASC`,
      [user_id, receiverId, receiverId, user_id]
    );

    res.json(rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};