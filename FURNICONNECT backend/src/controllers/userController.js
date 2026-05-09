const db = require("../db/db");

// GET USER PROFILE

const getUserProfile =
async (req, res) => {

  try {

    const { id } = req.params;

    console.log(
      "PROFILE USER ID:",
      id
    );

    // USER DETAILS

    const [users] =
      await db.query(

      `SELECT
        id,
        name,
        email,
        role,
        profile_image,
        bio,
        contact,
        rating
      FROM users
      WHERE id = ?`,

      [id]

    );

    console.log(users);

    if (users.length === 0) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    // USER WORKS

    const [works] =
      await db.query(

      `SELECT *
       FROM works
       WHERE user_id = ?
       ORDER BY work_id DESC`,

      [id]

    );

    res.json({

      user: users[0],

      works

    });

  } catch (err) {

    console.log(
      "GET PROFILE ERROR:",
      err
    );

    res.status(500).json({
      message: "Server error"
    });

  }

};

module.exports = {
  getUserProfile
};