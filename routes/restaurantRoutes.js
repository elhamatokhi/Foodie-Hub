import { Router } from "express";
import pool from "../models/db.js";
import {
  getAllRestaurants,
  addRestaurant,
  updateRestaurant,
} from "../controllers/restaurantController.js";
const router = Router();

/*-----------------RESTAURANTS-----------------*/

// View all restaurants
router.get("/restaurants", getAllRestaurants);

// Add a new restaurant
router.post("/restaurants", addRestaurant);

// // GET a new restaurant
// router.get("/restaurants/new", (req, res) => {
//   res.render("restaurants");
// });  Frontend should take care of it

// Update a restaurant
router.put("/restaurants/:id", updateRestaurant);

export default router;
