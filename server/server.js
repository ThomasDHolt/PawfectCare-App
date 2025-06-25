import express, { response } from "express";
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

app.get("/accounts/getById/:accountId", async (req, res) => {
    const accountId = req.params.accountId;

    const result = await db.query(`SELECT * FROM account WHERE account_id = $1`, [accountId]);

    res.json(result.rows);
});

app.get("/account/getByEmail/:email", async (req, res) => {
  const accountEmail = req.params.email;
  
  const result = await db.query(`SELECT * FROM account WHERE account_email ILIKE '%${accountEmail}%`);
  
  res.json(result.rows);
});

app.post("/accounts", async (req, res) => {
    const body = req.body;

    const accountNameFromClient = body.accountName;
    const accountTypeFromClient = body.accountType;
    const hashedPasswordFromClient = body.hashedPassword;
    const saltFromClient = body.salt;
    const personalInfoIdFromClient = body.personalInfoId;
    const emailFromClient = body.email;

    const data = await db.query(`INSERT INTO account (account_name, account_type, hashed_password, salt, personal_info_id, account_email) VALUES ($1, $2, $3, $4, $5, $6)`, [accountNameFromClient, accountTypeFromClient, hashedPasswordFromClient, saltFromClient, personalInfoIdFromClient, emailFromClient]);

    res.send(data);
});

app.get("/personalInfo", async (req, res) => {
    const result = await db.query('SELECT * FROM personalinfo');

    res.json(result.rows);
});

app.get("/personalInfo/getById/:infoId", async (req, res) => {
    const infoId = req.params.infoId;

    const result = await db.query(`SELECT * FROM personalinfo WHERE personal_info_id = $1`, [infoId]);

    res.json(result.rows);
});

app.get("/personalInfo/getByLocation/:location", async (req, res) => {
  const location = req.params.location;

  const result = await db.query(`SELECT * FROM personalinfo WHERE location ILIKE '%${location}%'`);

  res.json(result.rows);
});

app.post("/personalInfo", async (req, res) => {
    const body = req.body;

    const nameFromClient = body.name;
    const ageFromClient = body.age;
    const locationFromClient = body.location;

    const data = await db.query(`INSERT INTO personalInfo (name, age, location) VALUES ($1, $2, $3)`, [nameFromClient, ageFromClient, locationFromClient]);

    res.send(data);
});

app.put("/personalInfo/changeFullName/:info_id", async (req, res) => {
    const body = req.body;

    const newName = body.newName;
    const infoId = req.params.info_id;

    const data = await db.query(`UPDATE personalInfo SET name = $1 WHERE personal_info_id = $2`, [newName, infoId]);

    res.send(data);
});

app.put("/personalInfo/changeAge/:info_id", async (req, res) => {
    const body = req.body;

    const newAge = body.newAge;
    const infoId = req.params.info_id;

    const data = await db.query(`UPDATE personalInfo SET age = $1 WHERE personal_info_id = $2`, [newAge, infoId]);

    res.send(data);
});

app.put("/personalInfo/changeLocation/:info_id", async (req, res) => {
    const body = req.body;

    const newLocation = body.newLocation;
    const infoId = req.params.info_id;

    const data = await db.query(`UPDATE personalInfo SET location = $1 WHERE personal_info_id = $2`, [newLocation, infoId]);

    res.send(data);
});

app.get("/petOwners", async (req, res) => {
    const result = await db.query('SELECT * FROM petowner');

    res.json(result.rows);
});

app.get("/petOwners/getById/:accountId", async (req, res) => {
    const accountId = req.params.accountId;

    const result = await db.query(`SELECT * FROM petowner WHERE account_id = $1`, [accountId]);

    res.json(result.rows);
});

app.post("/petOwners", async (req, res) => {
    const body = req.body;

    const accountIdFromClient = body.accountId;
    const numOfPetsFromClient = body.numOfPets;
    const petIdsFromClient = body.petIds;

    const data = await db.query(`INSERT INTO petowner (account_id, number_of_pets, pet_ids) VALUES ($1, $2, $3)`, [accountIdFromClient, numOfPetsFromClient, petIdsFromClient]);

    res.send(data);
});

app.get("/petSitters", async (req, res) => {
    const result = await db.query('SELECT * FROM petsitter');

    res.json(result.rows);
});

app.get("/petSitters/getById/:accountId", async (req, res) => {
    const accountId = req.params.accountId;

    const result = await db.query(`SELECT * FROM petsitter WHERE account_id = $1`, [accountId]);

    res.json(result.rows);
});

app.post("/petSitters", async (req, res) => {
    const body = req.body;

    const accountIdFromClient = body.accountId;
    const feesFromClient = body.fees;
    const descriptionFromClient = body.description;
    const ratingFromClient = body.rating;

    const data = await db.query(`INSERT INTO petsitter (account_id, fees, description, rating) VALUES ($1, $2, $3, $4)`, [accountIdFromClient, feesFromClient, descriptionFromClient, ratingFromClient]);

    res.send(data);
});

app.get("/petInfo", async (req, res) => {
    const result = await db.query('SELECT * FROM petinfo');

    res.json(result.rows);
});

app.get("/petInfo/getById/:petId", async (req, res) => {
    const petId = req.params.petId;

    const result = await db.query(`SELECT * FROM petinfo WHERE pet_id = $1`, [petId]);

    res.json(result.rows);
});

app.get("/petInfo/getByPetType/:petType", async (req, res) => {
    const petType = req.params.petType;

    const result = await db.query(`SELECT * FROM petinfo WHERE pet_type ILIKE '${petType}'`);

    res.json(result.rows);
});


app.post("/petInfo", async (req, res) => {
    const body = req.body;

    const petNameFromClient = body.petName;
    const petTypeFromClient = body.petType;
    const petDescriptionFromClient = body.petDescription;
    const petAgeFromClient = body.petAge;
    const petWeightFromClient = body.petWeight;
    const petAllergiesFromClient = body.petAllergies;

    const data = await db.query(`INSERT INTO petinfo (pet_name, pet_type, pet_description, pet_age, pet_weight, pet_allergies) VALUES ($1, $2, $3, $4, $5, $6)`, [petNameFromClient, petTypeFromClient, petDescriptionFromClient, petAgeFromClient, petWeightFromClient, petAllergiesFromClient]);
});

app.listen("4974", () => {
    console.log("Server running...");
});