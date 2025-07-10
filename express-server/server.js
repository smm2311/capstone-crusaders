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

app.get('/api/sports', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("sports");
        const sports = await collection.find().toArray();
        res.json(sports);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});


app.get('/api/basketball', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("basketball");
        const basketball = await collection.find().toArray();
        res.json(basketball);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});

app.get('/api/baseball', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("baseball");
        const baseball = await collection.find().toArray();
        res.json(baseball);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});

app.get('/api/football', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("football");
        const football = await collection.find().toArray();
        res.json(football);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});

app.get('/api/soccer', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("soccer");
        const soccer = await collection.find().toArray();
        res.json(soccer);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});

app.get('/api/tennis', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("tennis");
        const tennis = await collection.find().toArray();
        res.json(tennis);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});

app.get('/api/basketball/:productId', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("basketball");
        const basketball = await collection.findOne({productId: +req.params.productId});
        res.json(basketball);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});


app.get('/api/baseball/:productId', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("baseball");
        const baseball = await collection.findOne({productId: +req.params.productId});
        res.json(baseball);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});


app.get('/api/football/:productId', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("football");
        const football = await collection.findOne({productId: +req.params.productId});
        res.json(football);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});


app.get('/api/soccer/:productId', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("soccer");
        const soccer = await collection.findOne({productId: +req.params.productId});
        res.json(soccer);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});


app.get('/api/tennis/:productId', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("tennis");
        const tennis = await collection.findOne({productId: +req.params.productId});
        res.json(tennis);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});

app.get('/api/sports/:productId', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("sports");
        const sports = await collection.findOne({productId: +req.params.productId});
        res.json(sports);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});


app.put("/api/:productId", async (req, res) => {
    
    console.log(req.body)
    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("orders");
        const status = await collection.insertOne(req.body);
        res.send(status)
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