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
        req.user.id,
        title,
        description,
        JSON.stringify(images),
        category
      ]

    );

    res.json({
      message:
        "Work added successfully"
    });

  } catch (err) {

    console.log(
      "ADD WORK ERROR:",
      err
    );

    res.status(500).json({
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

      JOIN users

      ON works.user_id =
      users.id

      ORDER BY
      works.work_id DESC`

    );

    res.json(rows);

  } catch (err) {

    console.log(
      "GET WORKS ERROR:",
      err
    );

    res.status(500).json({
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