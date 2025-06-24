import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.get("/", (req, res) => {
    res.json("On the Pet Sitter API root route");
});

app.listen("8080", () => {
    console.log("Server running...");
});