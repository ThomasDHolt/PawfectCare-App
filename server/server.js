import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const db = new pg.Pool({
    connectionString: process.env.DB_CONN
});

app.get("/", (req, res) => {
    res.json("On the Pet Sitter API root route");
});

app.get("/accounts", async (req, res) => {
    const result = await db.query('SELECT * FROM account');

    res.json(result.rows);
});

app.get("/personalInfo", async (req, res) => {
    const result = await db.query('SELECT * FROM personalinfo');

    res.json(result.rows);
});

app.get("/petOwners", async (req, res) => {
    const result = await db.query('SELECT * FROM petowner');

    res.json(result.rows);
});

app.get("/petSitters", async (req, res) => {
    const result = await db.query('SELECT * FROM petsitter');

    res.json(result.rows);
});

app.get("/petInfo", async (req, res) => {
    const result = await db.query('SELECT * FROM petinfo');

    res.json(result.rows);
});

app.listen("4974", () => {
    console.log("Server running...");
});