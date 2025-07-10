import express from "express";
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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

app.put("/api/order", async (req, res) => {

    // Takes in object with billing info and a list of product IDs

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const sports_collection = db.collection("sports");
        const orders_collection = db.collection("orders");

        for (let productId of req.body.productIds) {

            // Find product in sports collection.
            const product = await sports_collection.findOne({productId: +productId});
            const category = product.category;

            // Add product to orders collection.
            const order_status = await orders_collection.insertOne({...product, orderInfo: req.body.orderInfo});

            // Remove product from sports and sport-specific collections
            const sport_specific_collection = db.collection(category);
            const sport_specific_status = await sport_specific_collection.deleteOne({productId: +productId});
            const sports_status = await sports_collection.deleteOne({productId: +productId});
        }

        res.status(200).send({
            status: 'success',
            message: 'User orders successfully.'
        });

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