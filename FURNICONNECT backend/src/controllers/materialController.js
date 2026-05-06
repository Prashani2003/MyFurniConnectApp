const db = require("../db/db");

// ======================
// ADD MATERIAL
// ======================
exports.addMaterial = async (req, res) => {

  try {

    const {
      name,
      price,
      quantity
    } = req.body;

    const supplier_id = req.user.id;

    const image =
      req.file?.filename || null;

    await db.query(
      `
      INSERT INTO materials
      (supplier_id, name, price, quantity, image)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        supplier_id,
        name,
        price,
        quantity,
        image
      ]
    );

    res.status(201).json({
      message: "Material added"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

};

// ======================
// GET MATERIALS
// ======================
exports.getMaterials = async (req, res) => {

  try {

    const [materials] = await db.query(`
      SELECT
        *
      FROM materials
      ORDER BY material_id DESC
    `);

    res.json(materials);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

};

// ======================
// DELETE MATERIAL
// ======================
exports.deleteMaterial = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      `
      DELETE FROM materials
      WHERE material_id = ?
      `,
      [id]
    );

    res.json({
      message: "Material deleted"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

};