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

app.get("/accounts/:accountId", async (req, res) => {
    const accountId = req.params.accountId;

    const result = await db.query(`SELECT * FROM account WHERE account_id = $1`, [accountId]);

    res.json(result.rows);
});

app.get("/personalInfo", async (req, res) => {
    const result = await db.query('SELECT * FROM personalinfo');

    res.json(result.rows);
});

app.get("/personalInfo/:infoId", async (req, res) => {
    const infoId = req.params.infoId;

    const result = await db.query(`SELECT * FROM personalinfo WHERE personal_info_id = $1`, [infoId]);

    res.json(result.rows);
});

app.get("/petOwners", async (req, res) => {
    const result = await db.query('SELECT * FROM petowner');

    res.json(result.rows);
});

app.get("/petOwners/:accountId", async (req, res) => {
    const accountId = req.params.accountId;

    const result = await db.query(`SELECT * FROM petowner WHERE account_id = $1`, [accountId]);

    res.json(result.rows);
});

app.get("/petSitters", async (req, res) => {
    const result = await db.query('SELECT * FROM petsitter');

    res.json(result.rows);
});

app.get("/petSitters/:accountId", async (req, res) => {
    const accountId = req.params.accountId;

    const result = await db.query(`SELECT * FROM petsitter WHERE account_id = $1`, [accountId]);

    res.json(result.rows);
});

app.get("/petInfo", async (req, res) => {
    const result = await db.query('SELECT * FROM petinfo');

    res.json(result.rows);
});

app.get("/petInfo/:petId", async (req, res) => {
    const petId = req.params.petId;

    const result = await db.query(`SELECT * FROM petinfo WHERE pet_id = $1`, [petId]);

    res.json(result.rows);
});

app.listen("4974", () => {
    console.log("Server running...");
});