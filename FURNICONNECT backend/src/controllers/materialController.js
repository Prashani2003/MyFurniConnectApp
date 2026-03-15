const db = require("../db/db");

exports.addMaterial = (req, res) => {

  const { supplier_id, name, price, quantity } = req.body;

  const sql =
    "INSERT INTO materials (supplier_id,name,price,quantity) VALUES (?,?,?,?)";

  db.query(sql, [supplier_id, name, price, quantity], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Material added successfully"
    });

  });

};

exports.getMaterials = (req, res) => {

  const sql = "SELECT * FROM materials";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};