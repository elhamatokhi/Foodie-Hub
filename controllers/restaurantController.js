import { count } from "console";
import pool from "../models/db.js";

/* --------------------------- RESTAURANTS ------------------------------- */
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

// Delete a restaurant
export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  const query = `
  DELETE  FROM restaurants
  WHERE id = $1
  `;
  const result = await pool.query(query, [id]);

  if (result.rowCount === 0) {
    return res
      .status(404)
      .json({ success: false, message: "Restaurant not found." });
  }

  res
    .status(200)
    .json({ success: true, message: "Restaurant deleted successfully." });
};

/* --------------------------- END OF RESTAURANTS ------------------------------- */

/* --------------------------- MENU_ITEMS  START------------------------------- */

// ADD Menu Item
export const addMenuItem = async (req, res) => {
  const restaurant_id = req.params.id;
  try {
    const { name, description, price, category, dietary_info, available } =
      req.body;
    const query = `
    INSERT INTO menu_items (name, description, price, category, dietary_info, available, restaurant_id)  
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
    const values = [
      name,
      description,
      price,
      category,
      dietary_info,
      available,
      restaurant_id,
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(`Error adding  menu to restaurant ${restaurant_id} `, error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET menu in a restaurant
export const getMenuItem = async (req, res) => {
  const id = req.params.id;
  try {
    const query = `
     SELECT * FROM menu_items WHERE restaurant_id = $1
  `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menu items found for this restaurant.",
      });
    }

    res.status(200).json({ success: true, menuItems: result.rows });
  } catch (err) {
    console.error("Error fetching menu items by restaurant:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/* --------------------------- MENU_ITEMS END ------------------------------- */
