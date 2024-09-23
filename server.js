const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

const url = "mongodb://localhost:27017";
const dbName = "test";
let client;

// Connect to MongoDB once when the server starts
async function connectToDB() {
  client = new MongoClient(url);
  await client.connect();
  console.log("Connected to MongoDB");
}

connectToDB().catch(console.error);

// Function to get all records
async function getAll() {
  const db = client.db(dbName);
  const collection = db.collection("myCollection");
  return await collection.find({}).toArray();
}

// API endpoint to fetch all records
app.post('/api/findAll', async (req, res) => {
  try {
    const records = await getAll();
    res.json(records); // Send the records as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching records");
  }
});

// Function to insert a new record
async function insert(name, age) {
  const db = client.db(dbName);
  const collection = db.collection("myCollection");
  return await collection.insertOne({ name: `${name}`, age: `${age}`});
}

// API endpoint to insert a new record
app.post('/api/insert', async (req, res) => {
  const { name, age } = req.body; // Get name and age from the request body
  try {

    const result = await insert(name, age);
    res.status(201).json(result); // Send the created record
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting record");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
