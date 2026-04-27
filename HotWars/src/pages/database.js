import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();
app.use(cors());

const uri = "mongodb+srv://gurdeepghotra0987_db_user:ERrlPm6HkB28uzjI@cluster0.pxbk8kd.mongodb.net/HotWars";

const client = new MongoClient(uri);

app.get("/trivia", async (req, res) => {
    await client.connect();
    const db = client.db("HotWars");
    const data = await db.collection("Trivia").find({}, { projection: { _id: 0, ID: 0 } }).toArray();
    res.json(data);
});
app.get("/valorant", async (req, res) => {
    await client.connect();
    const db = client.db("HotWars");
    const data = await db.collection("Valorant").find({}, { projection: { _id: 0, ID: 0 } }).toArray();
    res.json(data);
});

app.listen(5000);