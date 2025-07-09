// server.js

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

app.get('/api/planets', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("planets");
        const planets = await collection.find().toArray();
        res.json(planets);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});


app.get('/api/characters', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("characters");
        const characters = await collection.find().toArray();
        res.json(characters);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});


app.get('/api/films', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("films");
        const films = await collection.find().toArray();
        res.json(films);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});

app.get('/api/characters/:id', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("characters");
        const character = await collection.findOne({id: +req.params.id});
        res.json(character);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});


app.get('/api/planets/:id', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("planets");
        const planet = await collection.findOne({id: +req.params.id});
        res.json(planet);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});

app.get('/api/films/:id', async (req, res) => {
    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("films");
        const film = await collection.findOne({id: +req.params.id});
        res.json(film);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
})

app.get('/api/films/:id/characters', async (req, res) => {
    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        let collection = db.collection("films_characters");
        let characters = await collection.find({film_id: +req.params.id}).toArray();
        const character_ids = characters.map(c => c.character_id);
        // map character ids to characters
        collection = db.collection("characters");
        characters = await Promise.all(character_ids.map(async (cid) => {

            const character = await collection.findOne({id: cid});
            return character;
        }));
        res.json(characters);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
})

app.get('/api/films/:id/planets', async (req, res) => {
    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        let collection = db.collection("films_planets");
        let planets = await collection.find({film_id: +req.params.id}).toArray();
        const planet_ids = planets.map(p => p.planet_id);

        // map character ids to character names
        collection = db.collection("planets");
        planets = await Promise.all(planet_ids.map(async (pid) => {

            const planet = await collection.findOne({id: pid});
            return planet;
        }));
        res.json(planets);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
})


app.get('/api/characters/:id/films', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("films_characters");
        const filmCollection = db.collection("films");

        const filmIds = (await collection.find({character_id: +req.params.id}).toArray()).map(data => data['film_id']);

        let films = []
        for (const filmId of filmIds) {
            const filmData = await filmCollection.findOne({id: filmId});
            films.push(filmData);
        }

        res.json(films);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});

app.get('/api/planets/:id/films', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("films_planets");
        const filmCollection = db.collection("films");

        const filmIds = (await collection.find({planet_id: +req.params.id}).toArray()).map(data => data['film_id']);

        let films = []
        for (const filmId of filmIds) {
            const filmData = await filmCollection.findOne({id: filmId});
            films.push(filmData);
        }

        res.json(films);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});

app.get('/api/planets/:id/characters', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("characters");
        const characters = (await collection.find({homeworld: +req.params.id}).toArray());

        res.json(characters);

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