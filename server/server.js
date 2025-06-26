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

app.put("/accounts/changeAccountName/:accountId", async (req, res) => {
    const body = req.body;

    const newAccountName = body.newAccountName;
    const accountId = req.params.accountId;

    const data = await db.query(`UPDATE account SET account_name = $1 WHERE account_id = $2`, [newAccountName, accountId]);

    res.send(data);
});

app.put("/accounts/changeAccountEmail/:accountId", async (req, res) => {
    const body = req.body;

    const newAccountEmail = body.newAccountEmail;
    const accountId = req.params.accountId;

    const data = await db.query(`UPDATE account SET account_email = $1 WHERE account_id = $2`, [newAccountEmail, accountId]);

    res.send(data);
});

app.put("/accounts/changeAccountPassword/:accountId", async (req, res) => {
    const body = req.body;

    const newHashedPassword = body.newHashedPassword;
    const accountId = req.params.accountId;

    const data = await db.query(`UPDATE account SET hashed_password = $1 WHERE account_id = $2`, [newHashedPassword, accountId]);

    res.send(data);
});

app.delete("/accounts/:accountId", async (req, res) => {
    const accountId = req.params.accountId;

    const data = await db.query(`DELETE FROM account WHERE account_id = $1`, [accountId]);

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

app.delete("/personalInfo/:infoId", async (req, res) => {
    const infoId = req.params.infoId;

    const data = await db.query(`DELETE FROM personalInfo WHERE personal_info_id = $1`, [infoId]);

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

app.put("/petOwners/changePetAmount/:accountId", async (req, res) => {
    const body = req.body;

    const newPetAmount = body.newPetAmount;
    const accountId = req.params.accountId;

    const data = await db.query(`UPDATE petOwner SET number_of_pets = $1 WHERE account_id = $2`, [newPetAmount, accountId]);

    res.send(data);
});

app.put("/petOwners/addPetId/:accountId", async (req, res) => {
    const body = req.body;

    const newPetId = body.newPetId;
    const accountId = req.params.accountId;

    const data = await db.query(`UPDATE petOwner SET pet_ids = ARRAY_APPEND(pet_ids, $1) WHERE account_id = $2`, [newPetId, accountId]);

    res.send(data);
});

app.delete("/petOwners/:accountId", async (req, res) => {
    const accountId = req.params.accountId;

    const data = await db.query(`DELETE FROM petOwner WHERE account_id = $1`, [accountId]);

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

app.put("/petSitters/changeFees/:accountId", async (req, res) => {
    const body = req.body;

    const newFees = body.newFees;
    const accountId = req.params.accountId;

    const data = await db.query(`UPDATE petSitter SET fees = $1 WHERE account_id = $2`, [newFees, accountId]);

    res.send(data);
});

app.put("/petSitters/changeDescription/:accountId", async (req, res) => {
    const body = req.body;

    const newDescription = body.newDescription;
    const accountId = req.params.accountId;

    const data = await db.query(`UPDATE petSitter SET description = $1 WHERE account_id = $2`, [newDescription, accountId]);

    res.send(data);
});

app.put("/petSitters/changeRating/:accountId", async (req, res) => {
    const body = req.body;

    const newRating = body.newRating;
    const accountId = req.params.accountId;

    const data = await db.query(`UPDATE petSitter SET rating = $1 WHERE account_id = $2`, [newRating, accountId]);

    res.send(data);
});

app.delete("/petSitters/:accountId", async (req, res) => {
    const accountId = req.params.accountId;

    const data = await db.query(`DELETE FROM petSitter WHERE account_id = $1`, [accountId]);

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

app.put("/petInfo/changeName/:petId", async (req, res) => {
    const body = req.body;

    const newPetName = body.newPetName;
    const petId = req.params.petId;

    const data = await db.query(`UPDATE petInfo SET pet_name = $1 WHERE pet_id = $2`, [newPetName, petId]);

    res.send(data);
});

app.put("/petInfo/changeAge/:petId", async (req, res) => {
    const body = req.body;

    const newPetAge = body.newPetAge;
    const petId = req.params.petId;

    const data = await db.query(`UPDATE petInfo SET pet_age = $1 WHERE pet_id = $2`, [newPetAge, petId]);

    res.send(data);
});

app.put("/petInfo/changeWeight/:petId", async (req, res) => {
    const body = req.body;

    const newPetWeight = body.newPetWeight;
    const petId = req.params.petId;

    const data = await db.query(`UPDATE petInfo SET pet_weight = $1 WHERE pet_id = $2`, [newPetWeight, petId]);

    res.send(data);
});

app.put("/petInfo/changeAllergies/:petId", async (req, res) => {
    const body = req.body;

    const newPetAllergies = body.newPetAllergies;
    const petId = req.params.petId;

    const data = await db.query(`UPDATE petInfo SET pet_allergies = $1 WHERE pet_id = $2`, [newPetAllergies, petId]);

    res.send(data);
});

app.delete("/petInfo/:petId", async (req, res) => {
    const petId = req.params.petId;

    const data = await db.query(`DELETE FROM petInfo WHERE pet_id = $1`, [petId]);

    res.send(data);
});

app.listen("4974", () => {
    console.log("Server running...");
});