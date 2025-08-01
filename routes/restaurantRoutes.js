import { Router } from "express";
import pool from "../models/db.js";
import {
  getAllRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addMenuItem,
  getMenuItem,
} from "../controllers/restaurantController.js";
const router = Router();

/*-----------------RESTAURANTS-----------------*/

// View all restaurants
router.get("/restaurants", getAllRestaurants);

// Add a new restaurant
router.post("/restaurants", addRestaurant);

// GET a new restaurant
// Frontend should take care of it

// Update a restaurant
router.put("/restaurants/:id", updateRestaurant);

// Delete a restaurant
router.delete("/delete/:id", deleteRestaurant);
export default router;

/* --------------------------- END OF RESTAURANTS ------------------------------- */

/* --------------------------- MENU_ITEMS  START------------------------------- */

// ADD menu_item to a retaurant
router.post("/restaurants/:id/menu", addMenuItem);

// GET menu_item in a restaurant
router.get("/restaurants/:id/menu", getMenuItem);
/* --------------------------- MENU_ITEMS END ------------------------------- */
