const db =
require("../db/db");



// ========================
// SEND MESSAGE
// ========================

exports.sendMessage =
  async (req, res) => {

    try {

      console.log(
        "USER:",
        req.user
      );

      console.log(
        "BODY:",
        req.body
      );

     console.log(
  "REQ USER:",
  req.user
);

const sender_id =
  req.user.user_id;

      const {
        receiver_id,
        message
      } = req.body;

      await db.query(

        `INSERT INTO messages
        (
          sender_id,
          receiver_id,
          message
        )

        VALUES (?, ?, ?)`,

        [
          sender_id,
          receiver_id,
          message
        ]

      );

      res.json({
        message:
          "Message sent"
      });

    } catch (err) {

      console.log(
        "SEND ERROR:",
        err
      );

      res.status(500).json({
        error: "Server error"
      });

    }

};

// ========================
// GET MESSAGES
// ========================

exports.getMessages =
async (req, res) => {

  try {

    const user_id =
  req.user.user_id;

    const {
      receiverId
    } = req.params;

    const [rows] =
      await db.query(

      `SELECT * FROM messages

      WHERE

      (
        sender_id = ?
        AND
        receiver_id = ?
      )

      OR

      (
        sender_id = ?
        AND
        receiver_id = ?
      )

      ORDER BY created_at ASC`,

      [
        user_id,
        receiverId,
        receiverId,
        user_id
      ]

    );

    res.json(rows);

  } catch (err) {

    console.log(
      "GET MSG ERROR:",
      err
    );

    res.status(500).json({
      error:
        "Server error"
    });

  }

};



// ========================
// GET CONVERSATIONS
// ========================

exports.getConversations =
  async (req, res) => {

    try {

      const userId =
        req.user.user_id;

      const [rows] =
        await db.query(

        `
        SELECT DISTINCT

          users.id,
          users.name

        FROM messages

        JOIN users

        ON users.id =

          CASE

            WHEN messages.sender_id = ?
            THEN messages.receiver_id

            ELSE messages.sender_id

          END

        WHERE

          messages.sender_id = ?
          OR
          messages.receiver_id = ?
        `,

        [
          userId,
          userId,
          userId
        ]

      );

      console.log(
        "CONVERSATIONS:",
        rows
      );

      res.json(rows);

    } catch (err) {

      console.log(
        "CONVERSATION ERROR:",
        err
      );

      res.status(500).json({
        error: "Server error"
      });

    }

};