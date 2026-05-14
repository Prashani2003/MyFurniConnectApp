const db = require("../db/db");

// ========================
// ADD WORK
// ========================

const addWork = async (req, res) => {

  try {

    const {
      title,
      description,
      category
    } = req.body;

    const user_id =
      req.user.id;

    const images =
      req.files?.map(
        (file) => file.filename
      ) || [];

    await db.query(

      `INSERT INTO works
      (
        user_id,
        title,
        description,
        images,
        category
      )

      VALUES (?, ?, ?, ?, ?)`,

      [
        user_id,
        title,
        description,
        JSON.stringify(images),
        category
      ]

    );

    res.json({
      success: true,
      message:
        "Work added successfully"
    });

  } catch (err) {

    console.log(
      "ADD WORK ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message:
        "Server error"
    });

  }

};

// ========================
// GET WORKS
// ========================

const getWorks = async (req, res) => {

  try {

    const [rows] =
      await db.query(

        `SELECT

          works.*,

          users.name

        FROM works

        LEFT JOIN users

        ON works.user_id = users.id

        ORDER BY works.work_id DESC`

      );

    console.log(
      "WORK ROWS:",
      rows
    );

    res.json(rows);

  } catch (err) {

    console.log(
      "GET WORKS ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message:
        "Server error"
    });

  }

};

// ========================
// EXPORTS
// ========================

module.exports = {

  addWork,

  getWorks

};