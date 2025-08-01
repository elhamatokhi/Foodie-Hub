import { Router } from "express";
import pool from "../models/db.js";
import {
  getAllRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addMenuItem,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  addCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  getAllOrders,
  addOrder,
  getOrdersByCustomer,
  updateOrder,
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

// Update menu_item
router.put("/menu/:id", updateMenuItem);

// DELETE menu_item in a restaurant
router.delete("/deleteMenu/:id", deleteMenuItem);

// GET all menu_items
router.get("/menuItems", getAllMenuItems);

/* --------------------------- MENU_ITEMS END ------------------------------- */

/* --------------------------- CUSTOMERS START ------------------------------- */

// GET customers
router.get("/customers", getAllCustomers);

// POST customers
router.post("/customers", addCustomer);

// Update customers
router.put("/customers/:id", updateCustomer);
// DELETE a customer
router.delete("/deleteCustomer/:id", deleteCustomer);

/* --------------------------- CUSTOMERS END ------------------------------- */

/* --------------------------- ORDERS START ------------------------------- */

// GET /orders
router.get("/orders", getAllOrders);

// POST /orders
router.post("/orders", addOrder);

// GET all orders for a customer
router.get("/customers/:id/orders", getOrdersByCustomer);

// PUT / Update an order
router.put("/orders/:id", updateOrder);

// DELETE an order
router.delete("/orders/:id", deleteOrder);

/* --------------------------- ORDERS END ------------------------------- */
