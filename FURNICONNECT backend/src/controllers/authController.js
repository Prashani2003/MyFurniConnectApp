const db = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// ============================
// 🟢 REGISTER
// ============================
exports.register = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      role,
      service_type,
    } = req.body;

    // VALIDATION
    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    // CHECK EMAIL
    const [existing] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // INSERT USER
    const [result] = await db.query(
      `
      INSERT INTO users
      (
        name,
        email,
        password,
        role,
        service_type
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        name,
        email,
        hashedPassword,
        role,
        service_type,
      ]
    );

    // GET NEW USER
    const [newUserRows] = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [result.insertId]
    );

    const newUser = newUserRows[0];

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });

  } catch (error) {

    console.log(
      "REGISTER ERROR:",
      error
    );

    res.status(500).json({
      message: "Register error",
      error: error.message,
    });
  }
};

// ============================
// 🔐 LOGIN
// ============================
exports.login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // FIND USER
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = rows[0];

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        user_id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // SEND RESPONSE
    res.status(200).json({
      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        service_type:
          user.service_type,
        profile_image:
          user.profile_image,
        bio: user.bio,
        contact: user.contact,
        rating: user.rating,
      },
    });

  } catch (error) {

    console.log(
      "LOGIN ERROR:",
      error
    );

    res.status(500).json({
      message: "Login error",
      error: error.message,
    });
  }
};