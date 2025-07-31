import { Router } from "express";
import pool from "../models/db.js";

const router = Router();

/*-----------------RESTAURANTS-----------------*/

// View all restaurants
router.get("/restaurants", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM restaurants");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Add a new restaurant

router.post("/restaurants", async (req, res) => {
  const { name, phone, street, city, country, opening_hours, description } =
    req.body;

  try {
    const query = `
      INSERT INTO restaurants (name, phone, street, city, country, opening_hours, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      name,
      phone,
      street,
      city,
      country,
      opening_hours,
      description,
    ];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding restaurant: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
