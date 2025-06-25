import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

// you beat me to it Tom
// app.get("/", (req, res) => {
//   res.json("On the Pet Sitter API root route");
// });

// app.get("/account/getByName/:name", async (req, res) => {
//   const accountname = req.params.name;
//   const result = await db.query(`SELECT * FROM account WHERE account_name ILIKE '%${name}%`);
//   res.json(result.rows);
// });

// app.get("/personalInfo/getByName/:name", async (req, res) => {
//   const infoname = req.params.name;
//   const result = await db.query(`SELECT * FROM personalinfo WHERE name ILKE %${name}%`);
//   res.json(result.rows);
// });

app.get("/personalInfo/getByLocation/:location", async (req, res) => {
  const location = req.params.location;
  const result = await db.query(
    `SELECT * FROM personalinfo WHERE location ILIKE %${location}% `
  );
  res.json(result.rows);
});

app.listen("4000", () => {
  console.log("Server running on localhost:4000 ...");
});
