import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { Pool } from "pg";
import router from "./routes/restaurantRoutes.js";

const app = express();
const PORT = 3000;

// __dirname Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
