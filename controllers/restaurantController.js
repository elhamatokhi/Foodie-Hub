import { count } from "console";
import pool from "../models/db.js";

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM restaurants");
    res.json(result.rows);
  } catch (err) {
    console.log("Error fetching restaurants: ", err);
    res.status(500).send("Internal Server Error");
  }
};

// Add a new restaurant
export const addRestaurant = async (req, res) => {
  const { name, phone, street, city, country, opening_hours, description } =
    req.body;

  try {
    const query = `INSERT INTO restaurants (name,phone, street, city, country, opening_hours, description)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`;
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
    res.status(201).json(result.rows[0]); // sending json obj to frontend
  } catch (err) {
    console.log("Error fetching restaurants: ", err);
    res.status(500).send("Internal Server Error");
  }
};

// Edit a restaurant
export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, phone, street, city, country, opening_hours, description } =
    req.body;

  try {
    const query = `
      UPDATE restaurants
      SET name = $1, phone = $2, street = $3, city = $4, country = $5, opening_hours = $6, description = $7
      WHERE id = $8
      RETURNING *`;

    const values = [
      name,
      phone,
      street,
      city,
      country,
      opening_hours,
      description,
      id,
    ];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found." });
    }
    res.status(200).json({ success: true, restaurant: result.rows[0] });
  } catch (error) {
    console.error("Error updating restaurant:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
