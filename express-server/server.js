import express from "express";
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const mongodb_url = process.env.MONGO_URL;
const mongodb_name = process.env.MONGO_DB;

// Get all products.
app.get('/api/products', async (req, res) => {

    let client;

    try {

        client = await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("products");
        const data = await collection.find().toArray();
        res.json(data);

    } catch(err) {
        console.error(err);
    } finally {
        await client.close();
    }
});

// Get all products related to a sport.
app.get('/api/products/category/:categoryName', async (req, res) => {

    let client;

    try {

        client = await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("products");
        const data = await collection.find({category: req.params.categoryName}).toArray();
        res.json(data);

    } catch(err) {
        console.error(err);
    } finally {
        await client.close();
    }
});

// Get a specific product according to its ID.
app.get('/api/products/id/:productId', async (req, res) => {

    let client;

    try {

        console.log(req.params.productId);

        client = await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("products");
        const data = await collection.findOne({'_id': new ObjectId(req.params.productId)});
        res.json(data);

    } catch(err) {
        console.error(err);
    } finally {
        await client.close();
    }

});

// Put a new customer into the customers collection, return their ID.
app.put('/api/customers', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const customersCollection = db.collection("customers");

        const customerIdStatus = await customersCollection.insertOne({...req.body});

        res.status(200).send({customerId: customerIdStatus.insertedId});

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});

// Put a new order into the orders collection, return their ID.
app.post('/api/orders', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const ordersCollection = db.collection("orders");

        const orderIdStatus = await ordersCollection.insertOne({customerId: req.body.customerId, productId: req.body.productId});

        res.status(200).send({orderId: orderIdStatus.insertedId});

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});

// TODO fill this in.
app.get('/api/recommend/:productId', async (req, res) => {
    res.json({'recommended': []});
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});