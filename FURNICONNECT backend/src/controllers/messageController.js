const db = require("../db/db");

exports.sendMessage = (req, res) => {

  const { sender_id, receiver_id, message } = req.body;

  const sql =
    "INSERT INTO messages (sender_id,receiver_id,message) VALUES (?,?,?)";

  db.query(sql, [sender_id, receiver_id, message], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Message sent successfully"
    });

  });

};

exports.getMessages = (req, res) => {

  const { sender_id, receiver_id } = req.query;

  const sql =
    "SELECT * FROM messages WHERE (sender_id=? AND receiver_id=?) OR (sender_id=? AND receiver_id=?) ORDER BY created_at ASC";

  db.query(sql, [sender_id, receiver_id, receiver_id, sender_id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};