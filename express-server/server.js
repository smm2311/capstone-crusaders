import express from "express";
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());

const mongodb_url = process.env.MONGO_URL;
const mongodb_name = process.env.MONGO_DB;

app.get('/api/soccer', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("soccer");
        const planets = await collection.find().toArray();
        res.json(soccer);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});